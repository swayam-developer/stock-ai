import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: globalThis.process?.env?.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

const GROQ_TIMEOUT_MS = 12000;
const CACHE_TTL_MS = 90 * 1000;
const scriptCache = new Map();

function buildFallbackScript(stock, news) {
  const symbol = stock?.symbol || "the stock";
  const price = stock?.price ? `₹${stock.price}` : "the current level";
  const change = Number.isFinite(stock?.change) ? `${stock.change.toFixed(2)}%` : "a mixed session";
  const topHeadline = news?.[0]?.title || "headline flow is currently light";

  return [
    `${symbol} is in focus today as traders react to intraday momentum and key levels shaping the next directional move.`,
    `${symbol} is trading near ${price} with a day move around ${change}, highlighting both short-term volatility and opportunity for disciplined entries.`,
    `Top market catalyst: ${topHeadline}. This headline can influence sentiment and near-term price behavior for active participants.`,
    `For beginners, focus on trend direction, support-resistance zones, and position sizing rather than chasing sudden candles during fast moves.`,
    `Follow this setup, track confirmation signals, and revisit the dashboard for the next concise market update.`
  ].join("\n");
}

function buildPrompt(stock, news) {
  const headlines = (news || []).slice(0, 3).map((n) => n.title).filter(Boolean).join(" | ") || "No major news.";

  return `Write a short stock video narration in EXACTLY 5 lines, plain text only.
Each line must be 16-22 words in this order: Hook, Stock Snapshot, News Catalyst, Beginner Takeaway, Call To Action.
Ticker: ${stock?.symbol}
Price: ${stock?.price}
High: ${stock?.high}
Low: ${stock?.low}
Change: ${stock?.change}
Headlines: ${headlines}`;
}

function cacheKey(stock, news) {
  return JSON.stringify({
    symbol: stock?.symbol,
    price: stock?.price,
    change: stock?.change,
    headlines: (news || []).slice(0, 2).map((x) => x.title)
  });
}

async function createWithTimeout(requestPromise, timeoutMs) {
  return Promise.race([
    requestPromise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Groq request timed out")), timeoutMs);
    })
  ]);
}

export async function generateScript(stock, news) {
  const key = cacheKey(stock, news);
  const cached = scriptCache.get(key);

  if (cached && cached.expiresAt > Date.now()) {
    return cached.script;
  }

  try {
    const completion = await createWithTimeout(
      groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        temperature: 0.2,
        max_tokens: 220,
        messages: [{ role: "user", content: buildPrompt(stock, news) }]
      }),
      GROQ_TIMEOUT_MS
    );

    const script = completion?.choices?.[0]?.message?.content?.trim();
    const safeScript = script || buildFallbackScript(stock, news);

    scriptCache.set(key, { script: safeScript, expiresAt: Date.now() + CACHE_TTL_MS });
    return safeScript;
  } catch (error) {
    console.error("Groq Error:", error.message || error);
    return buildFallbackScript(stock, news);
  }
}
