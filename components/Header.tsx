
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="p-4 border-b border-gray-800">
      <div className="container mx-auto flex items-center justify-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          AI Stock Predictor
        </h1>
      </div>
    </header>
  );
};
