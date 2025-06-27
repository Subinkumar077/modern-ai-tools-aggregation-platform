import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const scrollToTools = () => {
    const toolsSection = document.querySelector('[data-tools-section]');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Discover the{' '}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Future of AI
            </span>
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Your ultimate destination for discovering, comparing, and accessing the most powerful AI tools. 
            From chatbots to image generators, find the perfect AI solution for your needs.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-16"
          >
            <motion.button
              onClick={scrollToTools}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Explore AI Tools</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>

          {/* Features */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Instantly find and compare AI tools with our advanced search and filtering system.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Trusted Reviews</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Real user reviews and ratings to help you make informed decisions about AI tools.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mb-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Global Directory</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Comprehensive collection of AI tools from around the world, updated daily.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;