import openai, { getEmbedding } from "../services/openai.js";
import { searchQdrant } from "../services/qdrant.js";

export async function handleHealthQuery(message) {
  const vector = await getEmbedding(message);
  const results = await searchQdrant("healthInfo", vector);

  const context = results
    .map((r) => `${r.payload.title}:${r.payload.content}`)
    .join("\n\n");

  const prompt = `
You are a helpful and empathetic health assistant named "healthInfo".

Rules:
- ONLY use the provided knowledge base below to answer.
- If the knowledge base does not contain enough relevant information, respond with: 
  "Sorry, I don’t have enough information in my knowledge base to answer that."
- Never invent, guess, or rely on outside knowledge.

Knowledge Base:
${context}

User Query: ${message}
`.trim();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.3,
    max_tokens: 1000,
    stream: false,
  });

  return {
    answer: response.choices[0].message.content,
    from_knowledge_base: true,
    source: "healthInfo",
  };
}
