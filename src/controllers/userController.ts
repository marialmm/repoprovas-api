import { Request, Response } from "express";
import { CreateUserData } from "../repositories/userRepository";

import { SignupBody } from "../schemas/userSchemas";
import * as userService from "../services/userService.js";

export async function signup(req: Request, res: Response) {
    const body: SignupBody = req.body;

    delete body.confirmPassword;

    await userService.signup(body);

    res.sendStatus(201);
}

export async function signin(req: Request, res: Response) {
    const body: CreateUserData = req.body;

    const token = await userService.signin(body);

    res.send(token);
}
