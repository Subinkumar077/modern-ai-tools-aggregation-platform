import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Filters from './components/Filters';
import ToolGrid from './components/ToolGrid';
import ToolDetail from './components/ToolDetail';
import Footer from './components/Footer';
import { aiTools } from './data/tools';
import { AITool, FilterState } from './types';

function App() {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    price: 'all',
    search: '',
    sort: 'trending'
  });
  
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [showHero, setShowHero] = useState(true);

  // Filter and sort tools
  const filteredTools = useMemo(() => {
    let filtered = aiTools;

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        tool.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        tool.features.some(feature => 
          feature.toLowerCase().includes(filters.search.toLowerCase())
        )
      );
    }

    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(tool => tool.category === filters.category);
    }

    // Apply price filter
    if (filters.price !== 'all') {
      filtered = filtered.filter(tool => tool.price === filters.price);
    }

    // Apply sorting
    switch (filters.sort) {
      case 'trending':
        filtered = filtered.sort((a, b) => {
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          return b.rating - a.rating;
        });
        break;
      case 'topRated':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'latest':
        filtered = filtered.sort((a, b) => 
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
        break;
      case 'alphabetical':
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [filters]);

  // Hide hero when user starts searching or filtering
  useEffect(() => {
    if (filters.search || filters.category !== 'all' || filters.price !== 'all') {
      setShowHero(false);
    }
  }, [filters]);

  const handleSearchChange = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    if (newFilters.search === '' && newFilters.category === 'all' && newFilters.price === 'all') {
      setShowHero(true);
    }
  };

  const handleToolClick = (tool: AITool) => {
    setSelectedTool(tool);
  };

  const handleCloseToolDetail = () => {
    setSelectedTool(null);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header searchQuery={filters.search} onSearchChange={handleSearchChange} />
        
        <main>
          {showHero && <Hero />}
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Filters filters={filters} onFiltersChange={handleFiltersChange} />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                AI Tools Directory
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Showing {filteredTools.length} tools
                {filters.search && ` for "${filters.search}"`}
              </p>
            </motion.div>

            <ToolGrid tools={filteredTools} onToolClick={handleToolClick} />
          </div>
        </main>

        <Footer />
        
        <ToolDetail
          tool={selectedTool}
          isOpen={!!selectedTool}
          onClose={handleCloseToolDetail}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;