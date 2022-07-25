import { faker } from "@faker-js/faker";

export async function createTestData() {
    const name = faker.lorem.sentence(4);
    const pdfUrl = faker.internet.url();
    const categoryId = 1;
    const teacherId = 1;
    const disciplineId = 1;

    return { name, pdfUrl, disciplineId, teacherId, categoryId };
}
