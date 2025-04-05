import { NextFunction, Request, Response } from "express";
import AuthModel from "./AuthModel";
import bcrypt from "bcrypt"
import { HttpError } from "../asyncHandeler";
import jwt from "jsonwebtoken"

function verifyToken(token: string) {
    try {
        return jwt.verify(token, process.env.JWT_KEY || "");
    } catch (err: any) {
        if (err.name === "JsonWebTokenError" && err.message === "invalid signature") {
            return HttpError(401, "Token signature is invalid. Please login again.");
        } else if (err.name === "TokenExpiredError") {
            return HttpError(401, "Token has expired. Please login again.");
        } else {
            return HttpError(401, "Token verification failed.Please login again.");
        }
    }

}

class AuthController {

    async authGuard(req: Request, res: Response, next: NextFunction) {
        const token: any = req.headers["token"] || null;
        if (!token) return HttpError(401, "unAuthorized!")
        verifyToken(token)
        next()
    }

    async registerUser(req: Request, res: Response) {
        const { firstName, lastName, phone, password } = req.body
        const result: any = await AuthModel.create({ firstName, phone, lastName, password: bcrypt.hashSync(password, 8) })
        if (!result) return HttpError(500, "Somthing went wrong!")
        const token = jwt.sign({ ...result }, process.env?.JWT_SECRET || "somthing_secret", { expiresIn: "2d" })
        delete result.password
        if (!token) return HttpError(500, "Somthing went wrong!")
        return res.status(200).send({ message: "Success", token })
    }

    async loginUser(req: Request, res: Response) {
        const { phone, password } = req.body
        if (!phone) return HttpError(400, "Required field phone is empty!")
        if (!password) return HttpError(400, "Required field password is empty!")
        const result: any = await AuthModel.findOne({ phone })
        if (!result) return HttpError(400, "Phone number does't exist!");
        if (!bcrypt.compareSync(password, result.password)) {
            return HttpError(400, "Password and phone are't matched!")
        }
        delete result.password
        const token = jwt.sign({ ...result }, process.env?.JWT_SECRET || "somthing_secret", { expiresIn: "2d" })
        if (!token) return HttpError(500, "Somthing went wrong!")
        return res.status(200).send({ message: "Success", token })
    }
}

const authController = new AuthController()
export default authController