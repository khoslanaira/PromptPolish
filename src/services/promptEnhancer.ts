import { PromptType } from '../types';

export const enhancePrompt = async (
  prompt: string,
  type: PromptType
): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (!prompt.trim()) {
    return "Please provide a prompt to enhance.";
  }
  
  switch (type) {
    case 'text':
      return enhanceTextPrompt(prompt);
    case 'image':
      return enhanceImagePrompt(prompt);
    case 'video':
      return enhanceVideoPrompt(prompt);
    default:
      return prompt;
  }
};

const enhanceTextPrompt = (prompt: string): string => {
  const trimmedPrompt = prompt.trim().toLowerCase();
  
  // Handle command-style prompts
  if (trimmedPrompt.startsWith('write') || 
      trimmedPrompt.startsWith('create') || 
      trimmedPrompt.startsWith('generate')) {
    return addStructuredGuidance(prompt);
  }
  
  // Handle question-style prompts
  if (trimmedPrompt.startsWith('what') || 
      trimmedPrompt.startsWith('how') || 
      trimmedPrompt.startsWith('why') ||
      trimmedPrompt.includes('?')) {
    return addAnalyticalFramework(prompt);
  }
  
  // Handle descriptive prompts
  return addDescriptiveElements(prompt);
};

const addStructuredGuidance = (prompt: string): string => {
  return `${prompt}\n\nPlease structure the response as follows:
1. Introduction
   - Context and background
   - Clear thesis or main argument
2. Main Body
   - Key points with supporting evidence
   - Relevant examples and case studies
   - Counter-arguments and their refutation
3. Conclusion
   - Summary of main points
   - Implications and significance
   - Call to action or future considerations

Style Guidelines:
- Use clear, concise language
- Support claims with evidence
- Maintain a professional tone
- Include relevant citations where appropriate`;
};

const addAnalyticalFramework = (prompt: string): string => {
  return `${prompt}\n\nPlease provide a comprehensive analysis that includes:
- Definition of key terms and concepts
- Historical context and background
- Current state of understanding
- Different perspectives and approaches
- Real-world applications and examples
- Critical evaluation of evidence
- Practical implications
- Future directions and open questions

Consider multiple viewpoints and cite relevant research or expert opinions where applicable.`;
};

const addDescriptiveElements = (prompt: string): string => {
  return `${prompt}\n\nPlease provide a rich, detailed response that incorporates:
- Vivid descriptions and sensory details
- Relevant metaphors and analogies
- Supporting examples and illustrations
- Cultural or historical context
- Technical specifications where relevant
- Practical applications
- Impact and significance
- Related concepts and connections

Ensure the description is engaging, well-organized, and accessible to the target audience.`;
};

const enhanceImagePrompt = (prompt: string): string => {
  const trimmedPrompt = prompt.trim().toLowerCase();
  let enhancedPrompt = prompt;
  
  // Add subject details
  if (!trimmedPrompt.includes('angle') && !trimmedPrompt.includes('view')) {
    enhancedPrompt += ', front view, eye level';
  }
  
  // Add lighting if not specified
  if (!trimmedPrompt.includes('light') && !trimmedPrompt.includes('illuminat')) {
    enhancedPrompt += ', natural lighting, soft shadows';
  }
  
  // Add mood if not present
  if (!trimmedPrompt.includes('mood') && !trimmedPrompt.includes('atmosphere')) {
    enhancedPrompt += ', serene atmosphere';
  }
  
  // Add style if not specified
  if (!trimmedPrompt.includes('style')) {
    enhancedPrompt += ', photorealistic style';
  }
  
  // Add technical specifications
  enhancedPrompt += ', 8K resolution, ultra HD, professional photography';
  
  // Add composition elements
  if (!trimmedPrompt.includes('composition')) {
    enhancedPrompt += ', rule of thirds composition, perfect framing';
  }
  
  // Add detail level
  enhancedPrompt += ', intricate details, sharp focus, crystal clear';
  
  // Add professional touch
  enhancedPrompt += ', professional color grading, masterpiece quality';
  
  return enhancedPrompt;
};

const enhanceVideoPrompt = (prompt: string): string => {
  const trimmedPrompt = prompt.trim().toLowerCase();
  let enhancedPrompt = prompt;
  
  // Add camera movement if not specified
  if (!trimmedPrompt.includes('camera') && !trimmedPrompt.includes('shot')) {
    enhancedPrompt += ', smooth camera movement, dynamic shots';
  }
  
  // Add lighting setup if not mentioned
  if (!trimmedPrompt.includes('light')) {
    enhancedPrompt += ', cinematic lighting, dramatic shadows';
  }
  
  // Add atmosphere if not specified
  if (!trimmedPrompt.includes('mood') && !trimmedPrompt.includes('atmosphere')) {
    enhancedPrompt += ', immersive atmosphere';
  }
  
  // Add audio elements if not mentioned
  if (!trimmedPrompt.includes('sound') && !trimmedPrompt.includes('audio')) {
    enhancedPrompt += ', professional sound design, ambient audio';
  }
  
  // Add technical specifications
  enhancedPrompt += ', 8K resolution, 24fps, HDR';
  
  // Add cinematography elements
  if (!trimmedPrompt.includes('cinematic')) {
    enhancedPrompt += ', cinematic composition, depth of field';
  }
  
  // Add post-processing
  enhancedPrompt += ', professional color grading, seamless transitions';
  
  // Add production quality
  enhancedPrompt += ', high production value, industry standard quality';
  
  return enhancedPrompt;
};