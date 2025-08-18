import express from "express";
import { GetUserController, LoginController, OTPLoginController, OTPVerifyLoginController, RegisterController } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { ratelimiter } from "../middlewares/ratelimiter.js";

const authRouter = express.Router();

authRouter.post('/register',RegisterController)
authRouter.post('/login',ratelimiter,LoginController)
authRouter.get('/getUser',authMiddleware,GetUserController)
authRouter.post('/otp-sent',ratelimiter,OTPLoginController)
authRouter.post('/otp-verify',authMiddleware,OTPVerifyLoginController)

export default authRouter;