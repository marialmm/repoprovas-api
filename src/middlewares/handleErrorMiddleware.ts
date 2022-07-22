import { Request, Response, NextFunction } from "express";

import { errorTypeToStatusCode } from "../utils/errorUtils.js";

export function handleError(error, req: Request, res: Response, next: NextFunction){
    console.log(error);

    if(error.type){
        const statusCode = errorTypeToStatusCode(error.type);

        res.status(statusCode).send(error.message);
    } else {
        res.sendStatus(500);
    }
}