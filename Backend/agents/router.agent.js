import openai from "../services/openai.js";
import { handleHealthQuery } from "./healthInfo.agent.js";
import { handleHealthProductsQuery } from "./healthProducts.agent.js";

async function classifyQueryWithLLM(message) {
  const systemPrompt = `
You are MultiAI, a multi-agent AI router.

Your task: Decide which agent should handle the user's query.

Agents:
1. "healthInfo" → Use this if the user is asking about health, diseases, symptoms, prevention, treatments, diet, lifestyle, or general medical information.
2. "healthProducts" → Use this if the user is asking for product suggestions related to health (like medicines, supplements, devices, insurance plans, therapies, diet products).

Rules:
- If the query is not related to health or health products, respond with "unknown".
- Always respond with exactly one word: "healthInfo", "healthProducts", or "unknown".
- Do not add explanations, punctuation, or extra words.
`.trim();

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ],
  });
  return res.choices[0].message.content.trim();
}

export async function handleQuery(message) {
  const domain = await classifyQueryWithLLM(message);

  switch (domain) {
    case "healthInfo":
      return handleHealthQuery(message);
    case "healthProducts":
      return handleHealthProductsQuery(message);
    case `unknown`:
    default:
      return {
        answer:
          "Sorry, I can answer only health related questions or suggest health products.",
        from_knowledge_base: false,
        source: "unknown",
      };
  }
}
