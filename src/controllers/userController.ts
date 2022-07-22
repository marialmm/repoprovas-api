import { Request, Response } from "express";

import { SignupBody } from "../schemas/userSchemas";
import * as userService from "../services/userService.js";

export async function signup(req: Request, res: Response) {
    const body: SignupBody = req.body;

    delete body.confirmPassword;

    await userService.signup(body);

    res.sendStatus(201);
}
