import express from "express";
import { chatController } from "../controllers/chatController.js";
import { errorHandler } from "../error-handler.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { ratelimiter } from "../middlewares/ratelimiter.js";

const chatRouter = express.Router();

chatRouter.post('/chatUser',authMiddleware,errorHandler(chatController))

export default chatRouter;