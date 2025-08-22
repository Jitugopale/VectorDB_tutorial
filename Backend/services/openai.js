
import {OpenAI} from "openai"

//create openai client

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
})