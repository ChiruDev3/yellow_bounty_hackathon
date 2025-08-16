import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Marketing Content */}
        <div className="hidden lg:block">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Earn <span className="text-yellow-600">Yellow Tokens</span>
              <br />
              for Your Code
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Connect with open-source projects, solve issues, and get rewarded with cryptocurrency for your contributions.
            </p>
            <div className="grid grid-cols-1 gap-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700">Earn crypto rewards for merged PRs</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">Connect with amazing open-source projects</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-700">Build your developer reputation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div>
          {isLogin ? (
            <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
          ) : (
            <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
};