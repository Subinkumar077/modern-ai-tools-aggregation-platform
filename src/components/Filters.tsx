import React from 'react';
import { motion } from 'framer-motion';
import { Filter, SortAsc } from 'lucide-react';
import { FilterState, FilterCategory, FilterPrice, SortOption } from '../types';

interface FiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFiltersChange }) => {
  const categories: { value: FilterCategory; label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'chatbots', label: 'Chatbots' },
    { value: 'image-ai', label: 'Image AI' },
    { value: 'code-generators', label: 'Code Generators' },
    { value: 'audio-ai', label: 'Audio AI' },
    { value: 'video-ai', label: 'Video AI' },
    { value: 'writing-ai', label: 'Writing AI' },
    { value: 'data-analysis', label: 'Data Analysis' }
  ];

  const priceOptions: { value: FilterPrice; label: string }[] = [
    { value: 'all', label: 'All Prices' },
    { value: 'free', label: 'Free' },
    { value: 'freemium', label: 'Freemium' },
    { value: 'paid', label: 'Paid' }
  ];

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'trending', label: 'Trending' },
    { value: 'topRated', label: 'Top Rated' },
    { value: 'latest', label: 'Latest Added' },
    { value: 'alphabetical', label: 'A-Z' }
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8"
    >
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 text-purple-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFiltersChange({ ...filters, category: e.target.value as FilterCategory })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Price
          </label>
          <select
            value={filters.price}
            onChange={(e) => onFiltersChange({ ...filters, price: e.target.value as FilterPrice })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          >
            {priceOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <SortAsc className="h-4 w-4 inline mr-1" />
            Sort by
          </label>
          <select
            value={filters.sort}
            onChange={(e) => onFiltersChange({ ...filters, sort: e.target.value as SortOption })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <div className="flex items-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFiltersChange({
              category: 'all',
              price: 'all',
              search: '',
              sort: 'trending'
            })}
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Clear All
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Filters;