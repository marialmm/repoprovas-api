import { Test } from "@prisma/client";
import prisma from "../config/database.js";

type CreateTestData = Omit<Test, "id">;

export async function createTest(testData: CreateTestData) {
    await prisma.test.create({
        data: testData,
    });
}
