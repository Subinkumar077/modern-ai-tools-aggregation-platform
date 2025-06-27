import React from 'react';
import { motion } from 'framer-motion';
import { Star, ExternalLink, TrendingUp, Award, Clock } from 'lucide-react';
import { AITool } from '../types';

interface ToolCardProps {
  tool: AITool;
  onToolClick: (tool: AITool) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onToolClick }) => {
  const getPriceColor = (price: string) => {
    switch (price) {
      case 'free': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'freemium': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20';
      case 'paid': return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    // This would normally map categories to appropriate icons
    return null;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer group"
      onClick={() => onToolClick(tool)}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={tool.imageUrl}
          alt={tool.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex space-x-2">
          {tool.trending && (
            <span className="flex items-center px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </span>
          )}
          {tool.topRated && (
            <span className="flex items-center px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
              <Award className="h-3 w-3 mr-1" />
              Top Rated
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getPriceColor(tool.price)}`}>
            {tool.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {tool.name}
          </h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              window.open(tool.websiteUrl, '_blank');
            }}
            className="p-2 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </motion.button>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {tool.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-900 dark:text-white">
              {tool.rating}
            </span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
            ({tool.reviewCount} reviews)
          </span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
            >
              {feature}
            </span>
          ))}
          {tool.features.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
              +{tool.features.length - 3} more
            </span>
          )}
        </div>

        {/* Date Added */}
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Clock className="h-3 w-3 mr-1" />
          Added {new Date(tool.dateAdded).toLocaleDateString()}
        </div>
      </div>
    </motion.div>
  );
};

export default ToolCard;