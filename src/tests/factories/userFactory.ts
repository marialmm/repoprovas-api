import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import prisma from "../../config/database.js";

dotenv.config();

export function createLogin() {
    const email = faker.internet.email();
    const password = faker.internet.password();

    return { email, password };
}

interface Login {
    email: string;
    password: string;
}

export async function createUser(login: Login) {
    const SALT = +process.env.SALT;
    await prisma.user.create({
        data: {
            email: login.email,
            password: bcrypt.hashSync(login.password, SALT),
        },
    });
}
