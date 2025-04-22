export type PromptType = 'text' | 'image' | 'video';

export interface Prompt {
  id: string;
  originalPrompt: string;
  enhancedPrompt: string;
  type: PromptType;
  favorite: boolean;
  createdAt: Date;
}

export interface PromptHistoryItem {
  id: string;
  promptType: PromptType;
  originalPrompt: string;
  enhancedPrompt: string;
  favorite: boolean;
  createdAt: Date;
}