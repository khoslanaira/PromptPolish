import React, { useState } from 'react';
import { Clock, X, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PromptHistoryItem, PromptType } from '../types';

interface HistorySectionProps {
  history: PromptHistoryItem[];
  onSelectHistoryItem: (item: PromptHistoryItem) => void;
  onToggleFavorite: (id: string) => void;
  onClearHistory: () => void;
}

const HistorySection: React.FC<HistorySectionProps> = ({
  history,
  onSelectHistoryItem,
  onToggleFavorite,
  onClearHistory,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getPromptTypeColor = (type: PromptType) => {
    switch (type) {
      case 'text':
        return 'bg-primary-100 text-primary-800';
      case 'image':
        return 'bg-secondary-100 text-secondary-800';
      case 'video':
        return 'bg-accent-100 text-accent-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (history.length === 0) return null;

  return (
    <motion.div
      className="w-full mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
        <div 
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-gray-500 mr-2" />
            <h3 className="font-medium">Prompt History</h3>
            <span className="ml-2 bg-gray-100 text-xs px-2 py-0.5 rounded-full">
              {history.length}
            </span>
          </div>
          <div className="flex items-center">
            {isExpanded && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onClearHistory();
                }}
                className="text-xs text-gray-500 hover:text-error-600 mr-4"
              >
                Clear All
              </button>
            )}
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border-t border-gray-200 p-4 max-h-64 overflow-y-auto">
                {history.map((item) => (
                  <motion.div
                    key={item.id}
                    className="flex items-start justify-between p-3 hover:bg-gray-50 rounded-md mb-2 cursor-pointer transition-colors"
                    onClick={() => onSelectHistoryItem(item)}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getPromptTypeColor(item.promptType)}`}>
                          {item.promptType.charAt(0).toUpperCase() + item.promptType.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          {formatDate(item.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 truncate">
                        {item.originalPrompt}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(item.id);
                      }}
                      className={`ml-2 p-1 ${
                        item.favorite ? 'text-warning-500' : 'text-gray-400 hover:text-warning-500'
                      }`}
                    >
                      <Star className="w-4 h-4" fill={item.favorite ? 'currentColor' : 'none'} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default HistorySection;