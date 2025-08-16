import { createConfig, http } from 'wagmi';
import { mainnet, sepolia, hardhat } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

export const config = createConfig({
  chains: [mainnet, sepolia, hardhat],
  connectors: [
    injected(),
    walletConnect({ 
      projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id' 
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [hardhat.id]: http(),
  },
});

export const CONTRACTS = {
  YELLOW_TOKEN: '0x1234567890123456789012345678901234567890',
  BOUNTY_PLATFORM: '0x0987654321098765432109876543210987654321',
} as const;