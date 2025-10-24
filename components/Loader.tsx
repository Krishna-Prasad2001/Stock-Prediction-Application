
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-gray-800/30 rounded-xl border border-dashed border-gray-700">
      <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-gray-300">AI is analyzing the stock...</p>
      <p className="mt-1 text-sm text-gray-500">This may take a moment.</p>
    </div>
  );
};
