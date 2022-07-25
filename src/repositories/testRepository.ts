import { Test } from "@prisma/client";
import prisma from "../config/database.js";

type CreateTestData = Omit<Test, "id">;

export async function createTest(testData: CreateTestData) {
    await prisma.test.create({
        data: testData,
    });
}

export async function getTestsGroupByDiscipline() {
    const tests = await prisma.term.findMany({
        include: {
            disciplines: {
                include: {
                    teachersDiscipline: {
                        select: {
                            id: true,
                            discipline: {
                                select: {
                                    name: true,
                                },
                            },
                            teacher: {
                                select: {
                                    name: true,
                                },
                            },
                            tests: {
                                select: {
                                    id: true,
                                    name: true,
                                    pdfUrl: true,
                                    category: {
                                        select: {
                                            name: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    return tests;
}
