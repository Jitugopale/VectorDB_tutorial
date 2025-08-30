import { BadRequestException } from "../exceptions/bad-request.js";
import { ErrorCodes } from "../exceptions/root.js";
import { getEmbedding } from "../services/openai.js";
import { searchQdrant } from "../services/qdrant.js";
import openai from "../services/openai.js";

export const chatController = async (req, res, next) => {
  const { message } = req.body;

  if (!message) {
    return next(
      new BadRequestException(
        "message is required",
        ErrorCodes.MESSAGE_IS_REQUIRED
      )
    );
  }

  const vector = await getEmbedding(message);
  const searchResults = await searchQdrant("healthInfo", vector);

  const context = searchResults
    .map((r) => `${r.payload.title}:${r.payload.content}`)
    .join("\n\n");

  const prompt = `
    You are HealthAI, a helpful assistant trained only to answer health-related questions.  
If the user asks something outside health, politely say:  
"I am only trained to answer health-related queries."  
Be clear, humble, and empathetic in your responses.

${context}
User:${message}
    `;

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
  stream:false
});

  return res.status(200).json({
    status: 200,
    data: {
      response: response.choices[0].message.content,
    },
  });

};


