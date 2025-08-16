import React from 'react';
import { Trophy, Coins, Calendar } from 'lucide-react';
import { useERC7824 } from '../../hooks/useERC7824';

export const ContributorStats: React.FC = () => {
  const { contributorStats } = useERC7824();

  const formatDate = (timestamp: number) => {
    if (timestamp === 0) return 'Never';
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">ERC7824 Stats</h3>
          <p className="text-sm text-gray-600">Your contribution history</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
          <div className="flex items-center space-x-3">
            <Trophy className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-700">Total Contributions</span>
          </div>
          <span className="text-xl font-bold text-blue-600">
            {contributorStats.totalContributions}
          </span>
        </div>

        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
          <div className="flex items-center space-x-3">
            <Coins className="w-5 h-5 text-yellow-600" />
            <span className="font-medium text-gray-700">Total Earned</span>
          </div>
          <span className="text-xl font-bold text-yellow-600">
            {contributorStats.totalEarned.toFixed(2)} YELLOW
          </span>
        </div>

        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-700">Last Contribution</span>
          </div>
          <span className="text-sm font-medium text-green-600">
            {formatDate(contributorStats.lastContribution)}
          </span>
        </div>
      </div>
    </div>
  );
};