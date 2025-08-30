import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Example dataset (replace with a database in production)
const referenceTexts = [
  "Artificial Intelligence is transforming industries worldwide.",
  "The quick brown fox jumps over the lazy dog.",
  "OpenAI develops cutting-edge AI tools for the future."
];

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "No text provided" });

  try {
    // Get embedding for input text
    const inputEmbedding = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    const inputVector = inputEmbedding.data[0].embedding;

    // Compute similarity (cosine) with references
    function cosineSimilarity(vecA, vecB) {
      const dot = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
      const magA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
      const magB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
      return dot / (magA * magB);
    }

    let maxScore = 0;
    let mostSimilar = "";

    for (const ref of referenceTexts) {
      const refEmbedding = await client.embeddings.create({
        model: "text-embedding-3-small",
        input: ref,
      });
      const refVector = refEmbedding.data[0].embedding;
      const score = cosineSimilarity(inputVector, refVector);
      if (score > maxScore) {
        maxScore = score;
        mostSimilar = ref;
      }
    }

    res.json({
      plagiarism: maxScore > 0.85, // threshold for plagiarism
      similarityScore: maxScore,
      matchedText: mostSimilar,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
