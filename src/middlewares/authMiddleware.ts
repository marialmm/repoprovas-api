import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { unauthorizedError } from "../utils/errorUtils.js";
import * as userRepository from "../repositories/userRepository.js";

dotenv.config();

export async function validateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authorization: string = req.headers.authorization;

    if (!authorization) {
        throw unauthorizedError("Header not sent");
    }

    const token = authorization?.replace("Bearer ", "").trim();

    try {
        const SECRET = process.env.JWT_SECRET_KEY;
        const { userId } = jwt.verify(token, SECRET) as { userId: number };

        const flag = await checkUserExists(userId);
        if (flag !== true) {
            return;
        }

        res.locals.user = userId;
        next();
    } catch (e) {
        console.log(e);
        throw unauthorizedError("Invalid token");
    }
}

async function checkUserExists(userId: number) {
    const user = await userRepository.getById(userId);

    if (!user) {
        throw unauthorizedError("User doesn't exist");
    }

    return true;
}
