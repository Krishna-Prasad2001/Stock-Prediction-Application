
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { RiskProfileSelector } from './components/RiskProfileSelector';
import { StockSearch } from './components/StockSearch';
import { StockCard } from './components/StockCard';
import { Loader } from './components/Loader';
import { InfoIcon } from './components/icons/InfoIcon';
import { getStockPrediction } from './services/geminiService';
import type { RiskProfile, StockData } from './types';

const App: React.FC = () => {
  const [riskProfile, setRiskProfile] = useState<RiskProfile | null>(null);
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSearch = useCallback(async (ticker: string) => {
    if (!riskProfile) {
      setError("Please select a risk profile before searching.");
      return;
    }
    if (!ticker) {
      setError("Please enter a stock ticker.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setStockData(null);

    try {
      const data = await getStockPrediction(ticker, riskProfile);
      setStockData(data);
    } catch (err) {
      setError("Failed to fetch stock analysis. The ticker might be invalid or there was an issue with the AI service. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [riskProfile]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-slate-800 text-gray-200">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {!riskProfile ? (
            <RiskProfileSelector onProfileSelect={setRiskProfile} />
          ) : (
            <div className="space-y-8">
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <p className="text-center text-lg">Your current risk profile is: <span className="font-bold text-cyan-400">{riskProfile}</span></p>
                <button 
                  onClick={() => { setRiskProfile(null); setStockData(null); setError(null); }}
                  className="w-full mt-4 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Change Risk Profile
                </button>
              </div>
              
              <StockSearch onSearch={handleSearch} isLoading={isLoading} />
              
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">
                  <InfoIcon className="h-6 w-6 shrink-0"/>
                  <span>{error}</span>
                </div>
              )}

              {isLoading && <Loader />}

              {stockData && (
                 <div className="animate-fade-in">
                    <StockCard data={stockData} />
                 </div>
              )}

              {!isLoading && !stockData && (
                <div className="text-center py-16 px-6 bg-gray-800/30 rounded-xl border border-dashed border-gray-700">
                    <h2 className="text-2xl font-semibold text-gray-400">Welcome to AI Stock Predictor</h2>
                    <p className="mt-2 text-gray-500">Enter a stock ticker (e.g., GOOGL, TSLA, AAPL) to get started.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <footer className="text-center p-4 text-xs text-gray-600">
        <p>Disclaimer: This is an AI-powered tool for informational purposes only and not financial advice. Always do your own research.</p>
      </footer>
    </div>
  );
};

export default App;
