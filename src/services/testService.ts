import { CreateTestBody } from "../schemas/testSchemas.js";
import { badRequestError, notFoundError } from "../utils/errorUtils.js";
import * as categoryRepository from "../repositories/categoryRepository.js";
import * as teacherRepository from "../repositories/teacherRepository.js";
import * as testRespository from "../repositories/testRepository.js";

export async function createTest(testData: CreateTestBody) {
    const { categoryId, teacherId, disciplineId } = testData;
    await checkCategoryExistis(categoryId);
    const teacherDisciplineId = await getTeacherDisciplineId(
        teacherId,
        disciplineId
    );

    delete testData.disciplineId;
    delete testData.teacherId;

    await testRespository.createTest({ ...testData, teacherDisciplineId });
}

async function checkCategoryExistis(categoryId: number) {
    const category = await categoryRepository.getById(categoryId);

    if (!category) {
        throw notFoundError("Category not found");
    }
}

async function getTeacherDisciplineId(teacherId: number, disciplineId: number) {
    const relation = await teacherRepository.getByTeacherIdAndDiscplineId(
        teacherId,
        disciplineId
    );

    if (!relation) {
        throw badRequestError("Incorrect teacherId or disciplineId");
    }

    return relation.id;
}
