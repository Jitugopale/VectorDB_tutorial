import { BadRequestException } from "../exceptions/bad-request.js";
import { ErrorCodes } from "../exceptions/root.js";
import { openai } from "../services/openai.js"

export const chatController = async (req, res,next) => {
    const { message } = req.body;

    if(!message){
        return next(new BadRequestException("message is required",ErrorCodes.MESSAGE_IS_REQUIRED));
    }

    //call the openai api key

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", //any model
        messages: [{role: "user", content: message}]
    });

    return res.status(200).json({response:response.choices[0].message.content});
   
}