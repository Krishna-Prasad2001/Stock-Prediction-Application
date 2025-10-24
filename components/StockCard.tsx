
import React from 'react';
import type { StockData } from '../types';
import { StockChart } from './StockChart';
import { TrendingUpIcon } from './icons/TrendingUpIcon';
import { TrendingDownIcon } from './icons/TrendingDownIcon';
import { InfoIcon } from './icons/InfoIcon';

interface StockCardProps {
  data: StockData;
}

const getPredictionClasses = (prediction: 'BUY' | 'HOLD' | 'SELL') => {
  switch (prediction) {
    case 'BUY':
      return 'bg-green-500/10 text-green-400 border-green-500/30';
    case 'SELL':
      return 'bg-red-500/10 text-red-400 border-red-500/30';
    case 'HOLD':
      return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
  }
};

export const StockCard: React.FC<StockCardProps> = ({ data }) => {
  const predictionClasses = getPredictionClasses(data.prediction);

  return (
    <div className="bg-gray-800/60 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">{data.companyName}</h2>
            <p className="text-xl text-gray-400">{data.ticker}</p>
          </div>
          <div className={`px-6 py-3 rounded-lg text-center ${predictionClasses} border`}>
            <p className="text-sm font-semibold uppercase tracking-wider">Prediction</p>
            <p className="text-3xl font-bold">{data.prediction}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 text-center">
          <div className="bg-gray-900/50 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Current Price</p>
            <p className="text-2xl font-semibold">${data.currentPrice.toFixed(2)}</p>
          </div>
          <div className="bg-gray-900/50 p-4 rounded-lg">
            <p className="text-sm text-gray-400">1-Year Target</p>
            <p className="text-2xl font-semibold">${data.priceTarget.toFixed(2)}</p>
          </div>
          <div className="bg-gray-900/50 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Confidence</p>
            <p className="text-2xl font-semibold">{data.confidence}%</p>
          </div>
           <div className="bg-gray-900/50 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Potential</p>
            <p className={`text-2xl font-semibold ${data.priceTarget > data.currentPrice ? 'text-green-400' : 'text-red-400'}`}>
              {(((data.priceTarget - data.currentPrice) / data.currentPrice) * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2"><InfoIcon className="w-6 h-6"/> AI Summary</h3>
          <p className="text-gray-300 leading-relaxed">{data.summary}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center text-green-400 gap-2"><TrendingUpIcon className="w-6 h-6"/> Bull Case (Pros)</h3>
            <ul className="space-y-3">
              {data.pros.map((pro, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">&#10003;</span>
                  <span className="text-gray-300">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center text-red-400 gap-2"><TrendingDownIcon className="w-6 h-6"/> Bear Case (Cons)</h3>
            <ul className="space-y-3">
              {data.cons.map((con, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-400 mr-3 mt-1">&#10007;</span>
                  <span className="text-gray-300">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-900/30 p-4 md:p-6">
          <h3 className="text-xl font-bold mb-4 text-center text-gray-300">Plausible 12-Month Price History</h3>
          <div className="h-64 md:h-80 w-full">
            <StockChart data={data.historicalData} />
          </div>
      </div>
    </div>
  );
};
