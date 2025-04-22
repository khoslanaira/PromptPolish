import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-4 px-6 text-center text-gray-500 text-sm">
      <p>© {new Date().getFullYear()} PromptPolish. All rights reserved.</p>
      <p className="mt-1">
        Enhance your AI prompts for text, image, and video generation.
      </p>
    </footer>
  );
};

export default Footer;