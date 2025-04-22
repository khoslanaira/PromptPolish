import React from 'react';
import { MessageSquare, Image, Video } from 'lucide-react';
import { PromptType } from '../types';
import { motion } from 'framer-motion';

interface PromptTypeSelectorProps {
  selectedType: PromptType;
  onTypeChange: (type: PromptType) => void;
}

const PromptTypeSelector: React.FC<PromptTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
}) => {
  const types: { type: PromptType; label: string; icon: React.ReactNode }[] = [
    { type: 'text', label: 'Text', icon: <MessageSquare className="w-4 h-4" /> },
    { type: 'image', label: 'Image', icon: <Image className="w-4 h-4" /> },
    { type: 'video', label: 'Video', icon: <Video className="w-4 h-4" /> },
  ];

  const getTypeColor = (type: PromptType) => {
    switch (type) {
      case 'text':
        return 'from-primary-500 to-primary-600';
      case 'image':
        return 'from-secondary-500 to-secondary-600';
      case 'video':
        return 'from-accent-500 to-accent-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex p-1 rounded-lg bg-gray-100 shadow-inner">
        {types.map(({ type, label, icon }) => (
          <motion.button
            key={type}
            className={`relative flex items-center space-x-2 px-4 py-2 rounded-md ${
              selectedType === type
                ? 'text-white'
                : 'text-gray-700 hover:text-gray-900'
            }`}
            onClick={() => onTypeChange(type)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {selectedType === type && (
              <motion.div
                className={`absolute inset-0 rounded-md bg-gradient-to-r ${getTypeColor(type)}`}
                layoutId="activeTab"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative flex items-center space-x-2">
              {icon}
              <span>{label}</span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default PromptTypeSelector;