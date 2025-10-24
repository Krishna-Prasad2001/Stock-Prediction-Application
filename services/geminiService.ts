
import { GoogleGenAI, Type } from "@google/genai";
import type { RiskProfile, StockData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    ticker: { type: Type.STRING },
    companyName: { type: Type.STRING },
    currentPrice: { type: Type.NUMBER, description: "A plausible current market price for the stock." },
    prediction: { type: Type.STRING, enum: ['BUY', 'HOLD', 'SELL'] },
    confidence: { type: Type.INTEGER, description: 'Confidence score from 0 to 100 on the prediction.' },
    priceTarget: { type: Type.NUMBER, description: 'Plausible 1-year price target based on analysis.' },
    summary: { type: Type.STRING, description: 'A one-paragraph summary for a beginner explaining the overall sentiment.' },
    pros: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: '3 to 4 bullet points on why to be optimistic (the bull case), in simple terms.',
    },
    cons: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: '3 to 4 bullet points on potential risks (the bear case), in simple terms.',
    },
    historicalData: {
      type: Type.ARRAY,
      description: "Generate a plausible 12-month price history, with one data point per month, ending with last month. The price should be a number.",
      items: {
        type: Type.OBJECT,
        properties: {
          month: { type: Type.STRING, description: "Format as 'MMM YY', e.g., 'Jan 24'" },
          price: { type: Type.NUMBER }
        },
        required: ["month", "price"]
      }
    }
  },
  required: ["ticker", "companyName", "currentPrice", "prediction", "confidence", "priceTarget", "summary", "pros", "cons", "historicalData"]
};

export const getStockPrediction = async (ticker: string, riskProfile: RiskProfile): Promise<StockData> => {
  const systemInstruction = `You are 'Oracle', a sophisticated AI financial analyst. Your primary goal is to provide stock market predictions and analysis for absolute beginners. You must use simple, clear, and encouraging language. Avoid jargon at all costs. When analyzing a stock, you must return a JSON object adhering to the provided schema. The analysis should be tailored to the user's specified risk tolerance. For the historical data, generate a plausible 12-month price history ending with today's approximate price, which you should also estimate plausibly. The final month in historical data should be the most recent completed month.`;

  const userPrompt = `Analyze the stock with ticker symbol '${ticker}' for a user with a '${riskProfile}' risk tolerance.`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.5,
      },
    });

    const jsonText = response.text.trim();
    const parsedData: StockData = JSON.parse(jsonText);
    
    // Basic validation
    if (!parsedData.ticker || !parsedData.companyName || !parsedData.historicalData) {
        throw new Error("Received incomplete data from AI.");
    }

    return parsedData;

  } catch (error) {
    console.error("Error fetching or parsing Gemini response:", error);
    throw new Error("Failed to get stock prediction from AI service.");
  }
};
