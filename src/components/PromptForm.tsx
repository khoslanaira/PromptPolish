import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { PromptType } from '../types';

interface PromptFormProps {
  promptType: PromptType;
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({ promptType, onSubmit, isLoading }) => {
  const [promptInput, setPromptInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promptInput.trim() && !isLoading) {
      onSubmit(promptInput);
    }
  };

  const getPlaceholder = () => {
    switch (promptType) {
      case 'text':
        return 'Enter a basic text prompt to enhance...';
      case 'image':
        return 'Enter a simple image description to enhance...';
      case 'video':
        return 'Enter a basic video concept to enhance...';
      default:
        return 'Enter your prompt here...';
    }
  };

  const getButtonColor = () => {
    switch (promptType) {
      case 'text':
        return 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500';
      case 'image':
        return 'bg-secondary-600 hover:bg-secondary-700 focus:ring-secondary-500';
      case 'video':
        return 'bg-accent-600 hover:bg-accent-700 focus:ring-accent-500';
      default:
        return 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500';
    }
  };

  return (
    <motion.div
      className="w-full mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex">
          <div className="relative flex-grow">
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent h-24 resize-none"
              placeholder={getPlaceholder()}
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              disabled={isLoading}
            />
            {promptInput.length > 0 && (
              <button
                type="button"
                onClick={() => setPromptInput('')}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                aria-label="Clear input"
              >
                ×
              </button>
            )}
          </div>
          <motion.button
            type="submit"
            className={`px-4 text-white rounded-r-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${getButtonColor()} ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isLoading || !promptInput.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default PromptForm;