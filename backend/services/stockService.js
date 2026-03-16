import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

export async function getStockData(ticker) {
  try {

    const symbol = `${ticker}.NS`;

    const result = await yahooFinance.quote(symbol);

    return {
      symbol: ticker,
      price: result.regularMarketPrice,
      high: result.regularMarketDayHigh,
      low: result.regularMarketDayLow,
      change: result.regularMarketChangePercent,
      volume: result.regularMarketVolume
    };

  } catch (error) {

    console.error("Stock API error:", error);

    throw error;

  }
}