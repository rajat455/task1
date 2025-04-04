import express from "express"
import categoryRouter from "./Category/CategoryRouter"
import ConnectDb from "./connection"
import dotenv from "dotenv"
import authRouter from "./Auth/AuthRouter"
import authController from "./Auth/AuthController"
import { asyncHandler } from "./asyncHandeler"

dotenv.config()
const app = express()
ConnectDb()
app.use(express.json())

app.get("/", (req: any, res: any) => {
    return res.status(200).send({ message: "Success" })
})

app.use("/api/auth", authRouter)
app.use(asyncHandler(authController.authGuard))
app.use("/api/category", categoryRouter)





app.use((err: any, req: any, res:any, next: any) => {
    let statusCode = err.status || 500;
    if (err.name === "MongooseError") statusCode = 400
    if (err.name === "MongoServerError") statusCode = 409
    if (err.name === "CastError") err.message = "Somthing went wrong"
    if (err.name === "ValidationError") {
        statusCode = 400
        let tmp = err.message?.split("validation failed:")[1]
        tmp = tmp?.split(",")
        let message: any = {}
        tmp?.forEach((x?: string) => {
            x = x?.replace(" ", "")

            let field = x?.split(":")[0]
            let value = x?.split(":")[1]
            if (field && value) {
                message[field] = value
            }
        })
        err.message = message
        err.stack = err.errors
    }
    let message = err.message || "Internal Server Error";
    return res.status(statusCode).send({
        err: err.stack,
        message,
    });
})

app.listen(5000, () => {
    console.log("server started");
})

export default app