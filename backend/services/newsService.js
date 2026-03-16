import axios from "axios";

const FALLBACK_NEWS = [
  {
    title: "Market news is temporarily unavailable. Please try again shortly.",
    url: "https://www.reuters.com/markets/",
    source: "System"
  }
];

export async function getNews(ticker) {
  const apiKey = globalThis.process?.env?.GNEWS_API_KEY;

  if (!apiKey) {
    console.warn("GNEWS_API_KEY is missing. Returning fallback news.");
    return FALLBACK_NEWS;
  }

  try {
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(ticker)}&lang=en&max=5&token=${apiKey}`;
    const response = await axios.get(url, { timeout: 15000 });

    const articles = (response.data?.articles || [])
      .filter((article) => article?.title && article?.url)
      .map((article) => ({
        title: article.title,
        url: article.url,
        source: article.source?.name || "Unknown"
      }));

    return articles.length ? articles : FALLBACK_NEWS;
  } catch (error) {
    console.error("News API error:", error.response?.data || error.message);
    return FALLBACK_NEWS;
  }
}
