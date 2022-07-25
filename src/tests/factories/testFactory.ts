import { faker } from "@faker-js/faker";

import prisma from "../../config/database.js";

export function createTestData() {
    const name = faker.lorem.sentence(4);
    const pdfUrl = faker.internet.url();
    const categoryId = 1;
    const teacherId = 1;
    const disciplineId = 1;

    return { name, pdfUrl, disciplineId, teacherId, categoryId };
}

interface testData {
    name: string;
    pdfUrl: string;
    categoryId: number;
    teacherId: number;
    disciplineId: number;
    teacherDisciplineId: number;
}

export async function createNewTest(testData: testData) {
    testData.teacherDisciplineId = 1;
    delete testData.teacherId;
    delete testData.disciplineId;

    await prisma.test.create({
        data: testData,
    });
}

export async function getTestsByDiscipline() {
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
