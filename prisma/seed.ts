import prisma from "../src/config/database.js";

async function main() {
    await insertTerms();

    await insertCategories();

    await insertTeachers();

    await insertDisciplines();

    await insertTeachersDisciplines();
}

async function insertTerms() {
    const terms = [
        {
            number: 1,
        },
        {
            number: 2,
        },
        {
            number: 3,
        },
        {
            number: 4,
        },
        {
            number: 5,
        },
        {
            number: 6,
        },
    ];

    terms.forEach(async (term) => {
        await prisma.term.upsert({
            where: { number: term.number },
            update: {},
            create: term,
        });
    });
}

async function insertCategories() {
    const categories = [
        {
            name: "Projeto",
        },
        {
            name: "Prática",
        },
        {
            name: "Recuperação",
        },
    ];

    categories.forEach(async (category) => {
        await prisma.category.upsert({
            where: { name: category.name },
            update: {},
            create: category,
        });
    });
}

async function insertTeachers() {
    const teachers = [
        {
            name: "Diego Pinho",
        },
        {
            name: "Bruna Hamori",
        },
    ];

    teachers.forEach(async (teacher) => {
        await prisma.teacher.upsert({
            where: { name: teacher.name },
            update: {},
            create: teacher,
        });
    });
}

async function insertDisciplines() {
    const disciplines = [
        {
            name: "HTML E CSS",
            termId: 1,
        },
        {
            name: "JavaScript",
            termId: 2,
        },
        {
            name: "React",
            termId: 3,
        },
        {
            name: "Humildade",
            termId: 1,
        },
        {
            name: "Planejamento",
            termId: 2,
        },
        {
            name: "Autoconfiança",
            termId: 3,
        },
    ];

    disciplines.forEach(async (discipline) => {
        await prisma.discipline.upsert({
            where: { name: discipline.name },
            update: {},
            create: discipline,
        });
    });
}

async function insertTeachersDisciplines() {
    const teachersDisciplines = [
        {
            teacherId: 1,
            disciplineId: 1,
            id: 1
        },
        {
            teacherId: 1,
            disciplineId: 2,
            id: 2
        },
        {
            teacherId: 1,
            disciplineId: 3,
            id: 3
        },
        {
            teacherId: 2,
            disciplineId: 4,
            id: 4
        },
        {
            teacherId: 2,
            disciplineId: 5,
            id: 5
        },
        {
            teacherId: 2,
            disciplineId: 6,
            id: 6
        },
    ];

    teachersDisciplines.forEach(async (teacherDiscipline) => {
        await prisma.teachersDisciplines.upsert({
            where: { id: teacherDiscipline.id },
            update: {},
            create: teacherDiscipline,
        });
    });
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
