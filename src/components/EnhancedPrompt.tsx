import React, { useState } from 'react';
import { Copy, Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { PromptType } from '../types';

interface EnhancedPromptProps {
  originalPrompt: string;
  enhancedPrompt: string;
  promptType: PromptType;
  isFavorite: boolean;
  onToggleFavorite?: () => void;
}

const EnhancedPrompt: React.FC<EnhancedPromptProps> = ({
  originalPrompt,
  enhancedPrompt,
  promptType,
  isFavorite,
  onToggleFavorite,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(enhancedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTypeColor = () => {
    switch (promptType) {
      case 'text':
        return 'border-primary-200 bg-primary-50';
      case 'image':
        return 'border-secondary-200 bg-secondary-50';
      case 'video':
        return 'border-accent-200 bg-accent-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getTypeLabel = () => {
    switch (promptType) {
      case 'text':
        return { label: 'Text Prompt', color: 'bg-primary-600' };
      case 'image':
        return { label: 'Image Prompt', color: 'bg-secondary-600' };
      case 'video':
        return { label: 'Video Prompt', color: 'bg-accent-600' };
      default:
        return { label: 'Prompt', color: 'bg-gray-600' };
    }
  };

  const { label, color } = getTypeLabel();

  if (!enhancedPrompt) return null;

  return (
    <motion.div
      className="w-full mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Original Prompt</h3>
          <p className="text-gray-800">{originalPrompt}</p>
        </div>
        <div className={`border rounded-lg p-4 shadow-sm ${getTypeColor()}`}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className={`${color} text-white text-xs px-2 py-1 rounded-full`}>
                {label}
              </span>
            </div>
            {onToggleFavorite && (
              <motion.button
                onClick={onToggleFavorite}
                className={`p-1 rounded-full ${
                  isFavorite ? 'text-warning-500' : 'text-gray-400 hover:text-warning-500'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Star className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
              </motion.button>
            )}
          </div>
          <p className="text-gray-800 mb-2">{enhancedPrompt}</p>
          <div className="flex justify-end">
            <motion.button
              onClick={handleCopy}
              className="flex items-center text-sm text-gray-600 hover:text-primary-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  <span>Copy</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedPrompt;