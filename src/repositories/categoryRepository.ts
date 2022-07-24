import prisma from "../config/database.js";

export async function getById(id: number) {
    const category = await prisma.category.findUnique({
        where: { id },
    });

    return category;
}
