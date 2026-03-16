import axios from "axios";

export async function getNews(ticker) {

  try {

    const url = `https://gnews.io/api/v4/search?q=${ticker}&lang=en&max=5&token=${process.env.GNEWS_API_KEY}`;

    const response = await axios.get(url);

    return response.data.articles.map(article => ({
      title: article.title,
      url: article.url,
      source: article.source.name
    }));

  } catch (error) {

    console.error("News API error:", error.response?.data || error.message);

    throw error;

  }

}