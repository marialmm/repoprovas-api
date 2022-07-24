import Joi from "joi";
import { Test } from "@prisma/client";

export type CreateTestBody = Omit<Test, "id" | "teacherDisciplineId"> & {
    teacherId: number;
    disciplineId: number;
};

export const testSchema = Joi.object<CreateTestBody>({
    name: Joi.string().required(),
    pdfUrl: Joi.string().uri().required(),
    categoryId: Joi.number().required(),
    teacherId: Joi.number().required(),
    disciplineId: Joi.number().required(),
});
