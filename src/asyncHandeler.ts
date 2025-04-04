import { NextFunction, Request, Response } from "express";

export const asyncHandler = (controller:any) => (req:Request, res:Response, next:NextFunction) => {
    Promise.resolve(controller(req, res, next)).catch((err) => {
        return next(err);
    });
}

interface CustomeError extends Error{
    status?:number
}

export const HttpError = (status:number, message:string) => {
    const error : CustomeError = new Error();
    error.message = message;
    error.status = status
    throw error
}


