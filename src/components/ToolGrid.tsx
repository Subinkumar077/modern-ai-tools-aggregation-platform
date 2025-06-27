import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AITool } from '../types';
import ToolCard from './ToolCard';

interface ToolGridProps {
  tools: AITool[];
  onToolClick: (tool: AITool) => void;
}

const ToolGrid: React.FC<ToolGridProps> = ({ tools, onToolClick }) => {
  if (tools.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No tools found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your search criteria or filters
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence>
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            onToolClick={onToolClick}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ToolGrid;