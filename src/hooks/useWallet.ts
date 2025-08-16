import { useState, useEffect } from 'react';
import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi';
import { useReadContract } from 'wagmi';
import { CONTRACTS } from '../config/wagmi';
import type { WalletState } from '../types';

const YELLOW_TOKEN_ABI = [
  {
    "inputs": [{ "name": "account", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];

export const useWallet = (): WalletState & {
  connect: () => void;
  disconnect: () => void;
  isConnecting: boolean;
} => {
  const { address, isConnected } = useAccount();
  const { connect: wagmiConnect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  
  const { data: ethBalance } = useBalance({
    address: address,
  });

  const { data: yellowBalance } = useReadContract({
    address: CONTRACTS.YELLOW_TOKEN as `0x${string}`,
    abi: YELLOW_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  const connect = () => {
    const injectedConnector = connectors.find((x) => x.id === 'injected');
    if (injectedConnector) {
      wagmiConnect({ connector: injectedConnector });
    }
  };

  return {
    address: address || null,
    isConnected,
    balance: ethBalance?.formatted || '0',
    yellowTokenBalance: yellowBalance ? (Number(yellowBalance) / 1e18).toString() : '0',
    connect,
    disconnect,
    isConnecting: isPending,
  };
};