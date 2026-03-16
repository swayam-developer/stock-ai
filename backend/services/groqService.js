import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

export async function generateScript(stock, news) {
  try {
    const headlines = news?.map((n, idx) => `${idx + 1}. ${n.title}`).join("\n") || "No major news.";

    const prompt = `
You are creating a concise voice-over script for a 90-second stock video.
Return EXACTLY 5 lines. No numbering. No markdown.
Each line should be 18-28 words and correspond to this order:
1) Hook
2) Stock Snapshot
3) Market News
4) Beginner Takeaway
5) Call To Action

Use this stock context:
Ticker: ${stock?.symbol}
Price: ${stock?.price}
High: ${stock?.high}
Low: ${stock?.low}
Change %: ${stock?.change}

News headlines:
${headlines}
`;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      temperature: 0.5,
      messages: [{ role: "user", content: prompt }]
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Groq Error:", error);
    throw error;
  }
}
