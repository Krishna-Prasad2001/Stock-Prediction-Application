
export type RiskProfile = 'Conservative' | 'Moderate' | 'Aggressive';

export interface HistoricalDataPoint {
  month: string;
  price: number;
}

export interface StockData {
  ticker: string;
  companyName: string;

  currentPrice: number;
  prediction: 'BUY' | 'HOLD' | 'SELL';
  confidence: number;
  priceTarget: number;
  summary: string;
  pros: string[];
  cons: string[];
  historicalData: HistoricalDataPoint[];
}
