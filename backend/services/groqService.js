import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

export async function generateScript(stock, news) {

  try {

    const headlines = news?.map(n => n.title).join("\n") || "No major news.";

    const prompt = `
Create a 90 second stock market video script.

Hook (0-10 sec)
Stock Snapshot (10-30 sec)
What's Happening (30-60 sec)
Beginner Takeaway (60-80 sec)
Call to Action (80-90 sec)

Stock Data:
Price: ${stock?.price}
High: ${stock?.high}
Low: ${stock?.low}
Change: ${stock?.change}

News:
${headlines}

Explain for beginner investors.
`;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "user", content: prompt }
      ]
    });

    return completion.choices[0].message.content;

  } catch (error) {

    console.error("Groq Error:", error);
    throw error;

  }

}