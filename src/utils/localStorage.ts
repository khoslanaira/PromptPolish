import { Prompt, PromptHistoryItem } from '../types';

const HISTORY_KEY = 'promptPolish_history';
const FAVORITES_KEY = 'promptPolish_favorites';

export const getHistory = (): PromptHistoryItem[] => {
  const historyJson = localStorage.getItem(HISTORY_KEY);
  if (!historyJson) return [];
  
  try {
    return JSON.parse(historyJson).map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt),
    }));
  } catch (error) {
    console.error('Failed to parse history from localStorage', error);
    return [];
  }
};

export const addToHistory = (prompt: Prompt): void => {
  const history = getHistory();
  
  const newHistoryItem: PromptHistoryItem = {
    id: prompt.id,
    promptType: prompt.type,
    originalPrompt: prompt.originalPrompt,
    enhancedPrompt: prompt.enhancedPrompt,
    favorite: prompt.favorite,
    createdAt: prompt.createdAt,
  };
  
  const updatedHistory = [newHistoryItem, ...history].slice(0, 20); // Keep only last 20 items
  
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Failed to save history to localStorage', error);
  }
};

export const getFavorites = (): PromptHistoryItem[] => {
  const favoritesJson = localStorage.getItem(FAVORITES_KEY);
  if (!favoritesJson) return [];
  
  try {
    return JSON.parse(favoritesJson).map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt),
    }));
  } catch (error) {
    console.error('Failed to parse favorites from localStorage', error);
    return [];
  }
};

export const toggleFavorite = (promptId: string): boolean => {
  const history = getHistory();
  const favorites = getFavorites();
  
  const promptInHistory = history.find(item => item.id === promptId);
  if (!promptInHistory) return false;
  
  const isFavorite = favorites.some(item => item.id === promptId);
  
  if (isFavorite) {
    // Remove from favorites
    const updatedFavorites = favorites.filter(item => item.id !== promptId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    
    // Update in history
    const updatedHistory = history.map(item => 
      item.id === promptId ? { ...item, favorite: false } : item
    );
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    
    return false;
  } else {
    // Add to favorites
    const updatedFavorites = [{ ...promptInHistory, favorite: true }, ...favorites];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    
    // Update in history
    const updatedHistory = history.map(item => 
      item.id === promptId ? { ...item, favorite: true } : item
    );
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    
    return true;
  }
};

export const clearHistory = (): void => {
  localStorage.removeItem(HISTORY_KEY);
};