import React from 'react';
import { Wallet, Coins } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';

export const WalletConnection: React.FC = () => {
  const { address, isConnected, balance, yellowTokenBalance, connect, disconnect, isConnecting } = useWallet();

  if (isConnected) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Wallet className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Wallet Connected</h3>
              <p className="text-sm text-gray-600">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
            </div>
          </div>
          <button
            onClick={disconnect}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Disconnect
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-600">ETH</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">
              {parseFloat(balance).toFixed(4)}
            </p>
          </div>
          
          <div className="bg-yellow-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-1">
              <Coins className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-600">YELLOW</span>
            </div>
            <p className="text-lg font-semibold text-yellow-700">
              {parseFloat(yellowTokenBalance).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Wallet className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect Your Wallet</h3>
        <p className="text-gray-600 mb-6">
          Connect your crypto wallet to receive Yellow token rewards for your contributions
        </p>
        <button
          onClick={connect}
          disabled={isConnecting}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isConnecting ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Connecting...
            </div>
          ) : (
            'Connect Wallet'
          )}
        </button>
      </div>
    </div>
  );
};