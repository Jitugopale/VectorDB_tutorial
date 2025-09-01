import openai, { getEmbedding } from "../services/openai.js";
import { searchQdrant } from "../services/qdrant.js";

export async function handleHealthProductsQuery(message) {
  const vector = await getEmbedding(message);
  const results = await searchQdrant("healthProducts", vector);

  const context = results
    .map((r) => `${r.payload.title}:${r.payload.content}`)
    .join("\n\n");

  const prompt = `
You are a helpful and empathetic health product recommendation assistant named "healthProducts".

Your role:
- Use the provided knowledge base to suggest relevant health-related products.
- Always explain why the product is useful, how it helps, and when it may be beneficial.
- If multiple products fit, present them in a clear, user-friendly way (bullet points or short list).
- Do not provide medical advice or diagnoses (that is handled by another agent).
- If the knowledge base does not have suitable products, politely say you don’t have enough product suggestions instead of inventing them.

Knowledge Base:
${context}

User Query: ${message}

Now respond with helpful product recommendations.
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
    source: "healthProducts",
  };
}
