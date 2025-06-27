import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Star, Check, X as XIcon, DollarSign, Calendar, TrendingUp, Award } from 'lucide-react';
import { AITool } from '../types';

interface ToolDetailProps {
  tool: AITool | null;
  isOpen: boolean;
  onClose: () => void;
}

const ToolDetail: React.FC<ToolDetailProps> = ({ tool, isOpen, onClose }) => {
  if (!tool) return null;

  const getPriceColor = (price: string) => {
    switch (price) {
      case 'free': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'freemium': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20';
      case 'paid': return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative">
              <img
                src={tool.imageUrl}
                alt={tool.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <X className="h-6 w-6" />
              </motion.button>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex space-x-2">
                {tool.trending && (
                  <span className="flex items-center px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Trending
                  </span>
                )}
                {tool.topRated && (
                  <span className="flex items-center px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full">
                    <Award className="h-4 w-4 mr-1" />
                    Top Rated
                  </span>
                )}
              </div>

              {/* Title and Price */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{tool.name}</h2>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="ml-1 text-white font-medium">
                          {tool.rating} ({tool.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${getPriceColor(tool.price)}`}>
                      {tool.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    About {tool.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {tool.description}
                  </p>

                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Added {new Date(tool.dateAdded).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {tool.pricingDetails}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <div className="grid grid-cols-1 gap-6">
                    {/* Pros */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Pros
                      </h4>
                      <ul className="space-y-2">
                        {tool.pros.map((pro, index) => (
                          <li key={index} className="flex items-start text-gray-600 dark:text-gray-300">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Cons */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Cons
                      </h4>
                      <ul className="space-y-2">
                        {tool.cons.map((con, index) => (
                          <li key={index} className="flex items-start text-gray-600 dark:text-gray-300">
                            <XIcon className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href={tool.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Visit {tool.name}</span>
                  <ExternalLink className="h-4 w-4" />
                </motion.a>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border-2 border-purple-600 text-purple-600 dark:text-purple-400 font-semibold rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300"
                >
                  Add to Favorites
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToolDetail;