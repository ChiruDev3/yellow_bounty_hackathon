# ERC7824 Bounty Platform

A decentralized bounty platform built with ERC7824 smart contracts, enabling developers to earn Yellow tokens for contributing to open-source projects.

## 🚀 Features

- **ERC7824 Integration**: Built on ERC7824 standard with @erc7824/nitrolite
- **Yellow Token Rewards**: Earn YELLOW tokens for merged pull requests
- **Wallet Integration**: Connect Web3 wallets via Wagmi
- **Beautiful UI**: Modern, responsive interface with Tailwind CSS
- **Role-based Access**: Separate interfaces for developers and maintainers
- **Automated Payments**: Smart contracts automatically transfer rewards
- **GitHub Integration**: Link GitHub accounts for contribution tracking

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Wagmi** for Web3 integration
- **Viem** for Ethereum interactions
- **@tanstack/react-query** for data fetching

### Smart Contracts
- **Solidity 0.8.19**
- **ERC7824 Standard**
- **@erc7824/nitrolite** package
- **Hardhat** for development
- **OpenZeppelin** for security

### Key Components
- **YellowToken.sol**: ERC20 token for rewards
- **BountyPlatform.sol**: Core bounty management contract
- **Authentication System**: User signup/login
- **Wallet Connection**: Web3 wallet integration
- **Project Management**: Browse and manage bounties

## 📦 Installation & Setup

```bash
# Install dependencies
npm install

# Install ERC7824 package (mandatory)
npm install @erc7824/nitrolite

# Compile smart contracts
npm run compile

# Start development server
npm run dev
```

## 🔧 Smart Contract Deployment

```bash
# Deploy to local Hardhat network
npm run deploy:local

# Deploy to Sepolia testnet
npm run deploy:sepolia
```

## 💡 How It Works

1. **User Registration**: Developers and maintainers sign up with role selection
2. **Wallet Connection**: Users connect Web3 wallets to receive rewards
3. **Project Discovery**: Browse available projects and bounties
4. **Bounty Creation**: Maintainers create bounties with YELLOW token stakes
5. **Development**: Developers claim and work on bounties
6. **Automated Rewards**: Smart contracts automatically transfer tokens on PR merge

## 🏗 Architecture

```
src/
├── components/           # React components
│   ├── Auth/            # Authentication components
│   ├── Dashboard/       # Main dashboard
│   ├── Projects/        # Project management
│   └── Wallet/          # Wallet connection
├── contracts/           # Solidity smart contracts
├── config/             # Configuration files
├── hooks/              # Custom React hooks
├── types/              # TypeScript definitions
└── App.tsx             # Main application
```

## 🔒 Security Features

- **Row Level Security**: Smart contract access controls
- **ReentrancyGuard**: Protection against reentrancy attacks
- **Platform Fees**: Built-in fee mechanism (2.5%)
- **Automated Validation**: PR merge verification

## 🌟 Core Smart Contract Functions

### BountyPlatform.sol
- `createProject()`: Create new project
- `createBounty()`: Create bounty with token stake
- `claimBounty()`: Claim bounty for development
- `completeBounty()`: Mark bounty complete and transfer rewards
- `automatedPRCompletion()`: Automated reward distribution

### YellowToken.sol
- Standard ERC20 implementation
- Minting capabilities for platform rewards
- Burn functionality for token economics

## 🎯 Future Enhancements

- GitHub API integration for automated PR tracking
- Multi-token support beyond YELLOW
- Reputation system for developers
- Advanced bounty filtering and search
- Mobile application
- Integration with more ERC7824 features

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

Built with ❤️ using ERC7824 and modern Web3 technologies.