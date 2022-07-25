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

export async function createToken() {
    const login = createLogin();
    await createUser(login);

    const user = await prisma.user.findFirst({
        where: { email: login.email },
    });

    const SECRET = process.env.JWT_SECRET_KEY;
    const config = { expiresIn: 60 * 60 * 24 * 7 };
    const token = jwt.sign({ id: user.id }, SECRET, config);
    return token;
}
