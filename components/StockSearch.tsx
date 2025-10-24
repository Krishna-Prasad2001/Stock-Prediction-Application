
import React, { useState } from 'react';

interface StockSearchProps {
  onSearch: (ticker: string) => void;
  isLoading: boolean;
}

export const StockSearch: React.FC<StockSearchProps> = ({ onSearch, isLoading }) => {
  const [ticker, setTicker] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(ticker.toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        placeholder="Enter Stock Ticker (e.g. GOOGL)"
        className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all placeholder-gray-500"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Stock'}
      </button>
    </form>
  );
};
