import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { CONTRACTS } from '../config/wagmi';

// ERC7824 ABI for contribution tracking
const ERC7824_ABI = [
  {
    "inputs": [
      { "name": "contributionId", "type": "uint256" },
      { "name": "contributor", "type": "address" },
      { "name": "amount", "type": "uint256" },
      { "name": "timestamp", "type": "uint256" }
    ],
    "name": "ContributionMade",
    "type": "event"
  },
  {
    "inputs": [{ "name": "contributor", "type": "address" }],
    "name": "getContributorStats",
    "outputs": [
      { "name": "totalContributions", "type": "uint256" },
      { "name": "totalEarned", "type": "uint256" },
      { "name": "lastContribution", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export const useERC7824 = () => {
  const { address } = useAccount();
  const [contributorStats, setContributorStats] = useState({
    totalContributions: 0,
    totalEarned: 0,
    lastContribution: 0
  });

  const { data: statsData } = useReadContract({
    address: CONTRACTS.BOUNTY_PLATFORM as `0x${string}`,
    abi: ERC7824_ABI,
    functionName: 'getContributorStats',
    args: address ? [address] : undefined,
  });

  useEffect(() => {
    if (statsData) {
      setContributorStats({
        totalContributions: Number(statsData[0]),
        totalEarned: Number(statsData[1]) / 1e18, // Convert from wei
        lastContribution: Number(statsData[2])
      });
    }
  }, [statsData]);

  return {
    contributorStats,
    isERC7824Enabled: true
  };
};