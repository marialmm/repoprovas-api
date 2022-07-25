import { Test } from "@prisma/client";
import prisma from "../config/database.js";
import testRouter from "../routers/testRouter.js";

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
                    teacherDisciplines: {
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
                                    category: true,
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

export async function getTestsGroupByTeacher() {
    const tests = await prisma.teachersDisciplines.findMany({
        select: {
            id: true,
            teacher: {
                select: {
                    id: true,
                    name: true,
                },
            },
            discipline: {
                select: {
                    id: true,
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
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    });
    return tests;
}
