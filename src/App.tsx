import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import PromptTypeSelector from './components/PromptTypeSelector';
import PromptForm from './components/PromptForm';
import EnhancedPrompt from './components/EnhancedPrompt';
import HistorySection from './components/HistorySection';
import Footer from './components/Footer';
import { PromptType, Prompt, PromptHistoryItem } from './types';
import { enhancePrompt } from './services/promptEnhancer';
import { getHistory, addToHistory, toggleFavorite, clearHistory } from './utils/localStorage';

function App() {
  const [promptType, setPromptType] = useState<PromptType>('text');
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentPromptId, setCurrentPromptId] = useState<string | null>(null);
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = getHistory();
    setHistory(savedHistory);
  }, []);

  const handleTypeChange = (type: PromptType) => {
    setPromptType(type);
  };

  const handlePromptSubmit = async (prompt: string) => {
    setOriginalPrompt(prompt);
    setIsLoading(true);
    setIsFavorite(false);
    
    try {
      const enhanced = await enhancePrompt(prompt, promptType);
      setEnhancedPrompt(enhanced);
      
      const newPrompt: Prompt = {
        id: Date.now().toString(),
        originalPrompt: prompt,
        enhancedPrompt: enhanced,
        type: promptType,
        favorite: false,
        createdAt: new Date(),
      };
      
      setCurrentPromptId(newPrompt.id);
      addToHistory(newPrompt);
      
      // Refresh history
      setHistory(getHistory());
    } catch (error) {
      console.error('Error enhancing prompt:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = () => {
    if (currentPromptId) {
      const newIsFavorite = toggleFavorite(currentPromptId);
      setIsFavorite(newIsFavorite);
      setHistory(getHistory());
    }
  };

  const handleSelectHistoryItem = (item: PromptHistoryItem) => {
    setPromptType(item.promptType);
    setOriginalPrompt(item.originalPrompt);
    setEnhancedPrompt(item.enhancedPrompt);
    setCurrentPromptId(item.id);
    setIsFavorite(item.favorite);
  };

  const handleToggleHistoryItemFavorite = (id: string) => {
    toggleFavorite(id);
    setHistory(getHistory());
    
    if (id === currentPromptId) {
      setIsFavorite(!isFavorite);
    }
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-2xl font-bold text-center mb-8 text-gray-800"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Transform Your AI Prompts
          </motion.h2>
          
          <PromptTypeSelector 
            selectedType={promptType} 
            onTypeChange={handleTypeChange} 
          />
          
          <PromptForm 
            promptType={promptType} 
            onSubmit={handlePromptSubmit}
            isLoading={isLoading}
          />
          
          {enhancedPrompt && (
            <EnhancedPrompt 
              originalPrompt={originalPrompt}
              enhancedPrompt={enhancedPrompt}
              promptType={promptType}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
          
          <HistorySection 
            history={history}
            onSelectHistoryItem={handleSelectHistoryItem}
            onToggleFavorite={handleToggleHistoryItemFavorite}
            onClearHistory={handleClearHistory}
          />
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;