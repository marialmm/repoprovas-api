import { Request, Response } from "express";

import { CreateTestBody } from "../schemas/testSchemas.js";
import { badRequestError } from "../utils/errorUtils.js";
import * as testService from "../services/testService.js";

export async function createTest(req: Request, res: Response) {
    const body: CreateTestBody = req.body;

    await testService.createTest(body);

    res.sendStatus(201);
}

export async function getTests(req: Request, res: Response) {
    const groupBy = req.query.groupBy;
    let tests;

    if (groupBy === "disciplines") {
        tests = await testService.getTestsGroupByDiscipline();
    } else if (groupBy === "teachers") {
        tests = await testService.getTestsGroupByTeacher();
    } else {
        throw badRequestError("Invalid groupBy value");
    }

    res.send({tests});
}
