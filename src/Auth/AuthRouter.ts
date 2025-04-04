import { Router } from "express";
import { asyncHandler } from "../asyncHandeler";
import authController from "./AuthController";

const authRouter = Router()
authRouter.post("/register" , asyncHandler(authController.registerUser))
authRouter.post("/login", asyncHandler(authController.loginUser))

export default authRouter