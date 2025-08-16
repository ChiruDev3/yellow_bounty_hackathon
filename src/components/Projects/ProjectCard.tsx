import React from 'react';
import { ExternalLink, Star, DollarSign, Clock } from 'lucide-react';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onViewProject: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewProject }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
        </div>
        <a
          href={project.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center text-yellow-600 mb-1">
            <DollarSign className="w-4 h-4" />
          </div>
          <p className="text-lg font-bold text-gray-900">{project.totalBounties}</p>
          <p className="text-xs text-gray-600">Total Bounties</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center text-green-600 mb-1">
            <Clock className="w-4 h-4" />
          </div>
          <p className="text-lg font-bold text-gray-900">{project.activeBounties}</p>
          <p className="text-xs text-gray-600">Active</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center text-blue-600 mb-1">
            <Star className="w-4 h-4" />
          </div>
          <p className="text-lg font-bold text-gray-900">4.8</p>
          <p className="text-xs text-gray-600">Rating</p>
        </div>
      </div>

      <button
        onClick={() => onViewProject(project)}
        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 transform hover:scale-[1.02]"
      >
        View Bounties
      </button>
    </div>
  );
};