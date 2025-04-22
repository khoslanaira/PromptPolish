import React from 'react';
import { Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <motion.header 
      className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-6 shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Wand2 className="w-8 h-8" />
          <h1 className="text-2xl md:text-3xl font-bold">PromptPolish</h1>
        </div>
        <div>
          <span className="text-sm text-primary-100 hidden md:inline-block">
            Transform your basic prompts into creative masterpieces
          </span>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;