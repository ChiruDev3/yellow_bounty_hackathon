// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@erc7824/nitrolite/contracts/ERC7824.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BountyPlatform is ERC7824, ReentrancyGuard, Ownable {
    IERC20 public yellowToken;
    
    struct Bounty {
        uint256 id;
        address maintainer;
        uint256 amount;
        string issueUrl;
        string title;
        bool isActive;
        bool isCompleted;
        address claimedBy;
    }
    
    struct Project {
        uint256 id;
        address owner;
        string name;
        string repositoryUrl;
        bool isActive;
    }
    
    mapping(uint256 => Bounty) public bounties;
    mapping(uint256 => Project) public projects;
    mapping(address => uint256[]) public userBounties;
    mapping(string => uint256) public prToBounty; // PR URL to bounty ID
    
    uint256 public nextBountyId = 1;
    uint256 public nextProjectId = 1;
    uint256 public platformFee = 250; // 2.5%
    uint256 public constant FEE_DENOMINATOR = 10000;
    
    event BountyCreated(uint256 indexed bountyId, address indexed maintainer, uint256 amount);
    event BountyCompleted(uint256 indexed bountyId, address indexed developer, uint256 amount);
    event ProjectCreated(uint256 indexed projectId, address indexed owner, string name);
    event PRMerged(uint256 indexed bountyId, string prUrl, address developer);
    
    constructor(address _yellowToken) ERC7824("BountyPlatform", "1.0.0") {
        yellowToken = IERC20(_yellowToken);
    }
    
    function createProject(string calldata _name, string calldata _repositoryUrl) external {
        uint256 projectId = nextProjectId++;
        
        projects[projectId] = Project({
            id: projectId,
            owner: msg.sender,
            name: _name,
            repositoryUrl: _repositoryUrl,
            isActive: true
        });
        
        emit ProjectCreated(projectId, msg.sender, _name);
    }
    
    function createBounty(
        uint256 _projectId,
        uint256 _amount,
        string calldata _issueUrl,
        string calldata _title
    ) external {
        require(projects[_projectId].isActive, "Project not active");
        require(projects[_projectId].owner == msg.sender, "Not project owner");
        require(_amount > 0, "Amount must be greater than 0");
        
        require(
            yellowToken.transferFrom(msg.sender, address(this), _amount),
            "Token transfer failed"
        );
        
        uint256 bountyId = nextBountyId++;
        
        bounties[bountyId] = Bounty({
            id: bountyId,
            maintainer: msg.sender,
            amount: _amount,
            issueUrl: _issueUrl,
            title: _title,
            isActive: true,
            isCompleted: false,
            claimedBy: address(0)
        });
        
        userBounties[msg.sender].push(bountyId);
        
        emit BountyCreated(bountyId, msg.sender, _amount);
    }
    
    function claimBounty(uint256 _bountyId) external {
        Bounty storage bounty = bounties[_bountyId];
        require(bounty.isActive, "Bounty not active");
        require(!bounty.isCompleted, "Bounty already completed");
        require(bounty.claimedBy == address(0), "Bounty already claimed");
        
        bounty.claimedBy = msg.sender;
    }
    
    function completeBounty(uint256 _bountyId, string calldata _prUrl) external {
        Bounty storage bounty = bounties[_bountyId];
        require(bounty.isActive, "Bounty not active");
        require(!bounty.isCompleted, "Bounty already completed");
        require(bounty.maintainer == msg.sender, "Not bounty maintainer");
        require(bounty.claimedBy != address(0), "Bounty not claimed");
        
        bounty.isCompleted = true;
        bounty.isActive = false;
        
        uint256 fee = (bounty.amount * platformFee) / FEE_DENOMINATOR;
        uint256 developerAmount = bounty.amount - fee;
        
        require(yellowToken.transfer(bounty.claimedBy, developerAmount), "Transfer to developer failed");
        require(yellowToken.transfer(owner(), fee), "Fee transfer failed");
        
        prToBounty[_prUrl] = _bountyId;
        
        emit BountyCompleted(_bountyId, bounty.claimedBy, developerAmount);
        emit PRMerged(_bountyId, _prUrl, bounty.claimedBy);
        
        // ERC7824 event emission for tracking
        _emitContributionEvent(_bountyId, bounty.claimedBy, developerAmount);
    }
    
    function automatedPRCompletion(uint256 _bountyId, string calldata _prUrl, address _developer) external onlyOwner {
        Bounty storage bounty = bounties[_bountyId];
        require(bounty.isActive, "Bounty not active");
        require(!bounty.isCompleted, "Bounty already completed");
        
        bounty.isCompleted = true;
        bounty.isActive = false;
        bounty.claimedBy = _developer;
        
        uint256 fee = (bounty.amount * platformFee) / FEE_DENOMINATOR;
        uint256 developerAmount = bounty.amount - fee;
        
        require(yellowToken.transfer(_developer, developerAmount), "Transfer to developer failed");
        require(yellowToken.transfer(owner(), fee), "Fee transfer failed");
        
        prToBounty[_prUrl] = _bountyId;
        
        emit BountyCompleted(_bountyId, _developer, developerAmount);
        emit PRMerged(_bountyId, _prUrl, _developer);
        
        // ERC7824 event emission for tracking
        _emitContributionEvent(_bountyId, _developer, developerAmount);
    }
    
    function cancelBounty(uint256 _bountyId) external {
        Bounty storage bounty = bounties[_bountyId];
        require(bounty.maintainer == msg.sender, "Not bounty maintainer");
        require(bounty.isActive, "Bounty not active");
        require(!bounty.isCompleted, "Bounty already completed");
        
        bounty.isActive = false;
        
        require(yellowToken.transfer(bounty.maintainer, bounty.amount), "Refund failed");
    }
    
    function getBountyDetails(uint256 _bountyId) external view returns (Bounty memory) {
        return bounties[_bountyId];
    }
    
    function getUserBounties(address _user) external view returns (uint256[] memory) {
        return userBounties[_user];
    }
    
    function setPlatformFee(uint256 _fee) external onlyOwner {
        require(_fee <= 1000, "Fee too high"); // Max 10%
        platformFee = _fee;
    }
    
    function _emitContributionEvent(uint256 _bountyId, address _contributor, uint256 _amount) internal {
        // ERC7824 standard event emission for contribution tracking
        emit ContributionMade(_bountyId, _contributor, _amount, block.timestamp);
    }
}