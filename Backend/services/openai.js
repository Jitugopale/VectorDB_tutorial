
import {OpenAI} from "openai"
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

//create openai client

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
})


export async function getEmbedding(text) {
    const res = await openai.embeddings.create({
        model:"text-embedding-3-small", //1536 dimensions, size of embeddings
        input: text
    })

    return Array.from(res.data[0].embedding)
}

export default openai;

