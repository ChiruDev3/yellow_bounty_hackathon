export interface User {
  id: string;
  email: string;
  walletAddress?: string;
  githubUsername?: string;
  role: 'developer' | 'maintainer';
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  repositoryUrl: string;
  maintainerId: string;
  totalBounties: number;
  activeBounties: number;
  tags: string[];
  createdAt: string;
}

export interface Bounty {
  id: string;
  projectId: string;
  title: string;
  description: string;
  amount: number; // in Yellow tokens
  status: 'open' | 'claimed' | 'completed' | 'cancelled';
  issueUrl: string;
  claimedBy?: string;
  completedAt?: string;
  transactionHash?: string;
  createdAt: string;
}

export interface PullRequest {
  id: string;
  bountyId: string;
  prUrl: string;
  developerId: string;
  status: 'pending' | 'merged' | 'closed';
  mergedAt?: string;
}

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  balance: string;
  yellowTokenBalance: string;
}