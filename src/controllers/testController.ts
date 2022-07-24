import { Request, Response } from "express";
import { CreateTestBody } from "../schemas/testSchemas";

import * as testService from "../services/testService.js";

export async function createTest(req: Request, res: Response) {
    const body: CreateTestBody = req.body;

    await testService.createTest(body);

    res.sendStatus(201);
}
