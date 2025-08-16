import React, { useState } from 'react';
import { Search, Filter, Plus, Github } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { WalletConnection } from '../Wallet/WalletConnection';
import { ProjectCard } from '../Projects/ProjectCard';
import { ContributorStats } from '../ERC7824/ContributorStats';
import type { Project } from '../../types';

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'React Components Library',
    description: 'A modern React components library with TypeScript support and beautiful animations.',
    repositoryUrl: 'https://github.com/example/react-components',
    maintainerId: '1',
    totalBounties: 12,
    activeBounties: 5,
    tags: ['React', 'TypeScript', 'UI/UX'],
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    name: 'Crypto Trading Bot',
    description: 'An automated cryptocurrency trading bot with advanced strategies and risk management.',
    repositoryUrl: 'https://github.com/example/crypto-bot',
    maintainerId: '2',
    totalBounties: 8,
    activeBounties: 3,
    tags: ['Python', 'Crypto', 'Trading'],
    createdAt: '2024-01-20T00:00:00Z',
  },
  {
    id: '3',
    name: 'AI Chat Assistant',
    description: 'A conversational AI assistant built with modern NLP techniques and real-time responses.',
    repositoryUrl: 'https://github.com/example/ai-chat',
    maintainerId: '3',
    totalBounties: 15,
    activeBounties: 7,
    tags: ['AI/ML', 'Python', 'NLP'],
    createdAt: '2024-01-25T00:00:00Z',
  },
];

export const Dashboard: React.FC = () => {
  const { user, logout, connectGithub } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [githubUsername, setGithubUsername] = useState('');
  const [showGithubModal, setShowGithubModal] = useState(false);

  const filteredProjects = mockProjects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleConnectGithub = async () => {
    if (githubUsername.trim()) {
      await connectGithub(githubUsername);
      setShowGithubModal(false);
      setGithubUsername('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">BountyHub</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.email}</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full capitalize">
                {user?.role}
              </span>
              {!user?.githubUsername && (
                <button
                  onClick={() => setShowGithubModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Connect GitHub</span>
                </button>
              )}
              <button
                onClick={logout}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <WalletConnection />
            
            <ContributorStats />
            
            {user?.role === 'maintainer' && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-200">
                  <Plus className="w-4 h-4" />
                  <span>Create Project</span>
                </button>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search projects, technologies, or bounties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onViewProject={setSelectedProject}
                />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-600">Try adjusting your search terms or filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* GitHub Connect Modal */}
      {showGithubModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Github className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Connect GitHub</h3>
              <p className="text-gray-600 mt-2">Link your GitHub account to track contributions</p>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter your GitHub username"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowGithubModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConnectGithub}
                  className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
                >
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};