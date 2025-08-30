import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "No text provided" });

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a summarization assistant. Provide a concise summary." },
        { role: "user", content: text },
      ],
    });

    res.json({ output: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
