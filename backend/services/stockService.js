import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance({ suppressNotices: ["yahooSurvey"] });

function toNumber(value, fallback = null) {
  return Number.isFinite(value) ? value : fallback;
}

function firstDefined(...values) {
  return values.find((value) => value !== undefined && value !== null);
}

export async function getStockData(ticker) {
  try {
    const symbol = `${ticker}.NS`;
    const result = await yahooFinance.quote(symbol);

    const price = toNumber(
      firstDefined(
        result?.regularMarketPrice,
        result?.postMarketPrice,
        result?.preMarketPrice,
        result?.fiftyTwoWeekLow
      )
    );

    if (price === null) {
      throw new Error(`No market price returned for ticker ${ticker}`);
    }

    const previousClose = toNumber(result?.regularMarketPreviousClose, price);
    const absoluteChange = toNumber(result?.regularMarketChange, price - previousClose);
    const percentageChange = toNumber(
      result?.regularMarketChangePercent,
      previousClose ? ((price - previousClose) / previousClose) * 100 : 0
    );

    return {
      symbol: result?.symbol || ticker,
      price,
      high: toNumber(result?.regularMarketDayHigh, price),
      low: toNumber(result?.regularMarketDayLow, price),
      change: percentageChange,
      changeAmount: absoluteChange,
      volume: toNumber(result?.regularMarketVolume, 0)
    };
  } catch (error) {
    console.error("Stock API error:", error);
    throw error;
  }
}
