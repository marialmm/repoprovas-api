import supertest from "supertest";

import app from "../index.js";
import prisma from "../config/database.js";
import * as userFactory from "./factories/userFactory.js";
import * as testFactory from "./factories/testFactory.js";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE tests;`;
});

describe("Post test tests", () => {
    it("Given a correct input, should create a new test and return 201", async () => {
        const token = await userFactory.createToken();
        const header = {
            Authorization: `Bearer ${token}`,
        };

        const testData = await testFactory.createTestData();

        const response = await supertest(app)
            .post("/test")
            .set(header)
            .send(testData);

        expect(response.statusCode).toBe(201);

        const test = await prisma.test.findFirst({
            where: { name: testData.name },
        });

        expect({ name: testData.name, pdfUrl: testData.pdfUrl }).toEqual(
            {name: test.name, pdfUrl: test.pdfUrl}
        );
    });
});
