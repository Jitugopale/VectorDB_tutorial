import express from "express";
import authRouter from "./authRoutes.js";
import { PrismaClient } from "@prisma/client";
import chatRouter from "./chatRoutes.js";

const rootRouter = express.Router();

rootRouter.use("/auth",authRouter)
rootRouter.use("/chat",chatRouter)

export const prismaClient = new PrismaClient({
    log:['query']
});

export default rootRouter;