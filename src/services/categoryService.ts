import * as categoryRepository from "../repositories/categoryRepository.js"

export async function getAll(){
    const categories = await categoryRepository.getAll();

    return categories;
}