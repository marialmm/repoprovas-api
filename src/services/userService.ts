import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as userRepository from "../repositories/userRepository.js";
import {
    conflictError,
    notFoundError,
    unauthorizedError,
} from "../utils/errorUtils.js";

dotenv.config();

export async function signup(userData: userRepository.CreateUserData) {
    const { email } = userData;

    await checkEmailAlreadyExists(email);

    userData.password = encryptPassword(userData.password);

    await userRepository.signup(userData);
}

async function checkEmailAlreadyExists(email: string) {
    const user = await userRepository.getByEmail(email);

    if (user) {
        throw conflictError("Email is already in use");
    }
}

function encryptPassword(password: string) {
    const SALT = parseInt(process.env.SALT);
    return bcrypt.hashSync(password, SALT);
}

export async function signin(userData: userRepository.CreateUserData) {
    const user = await userRepository.getByEmail(userData.email);

    if (!user) {
        throw notFoundError("User not Found");
    }

    checkPassword(userData.password, user.password);
    const token = generateToken(user.id);

    return token;
}

function checkPassword(password: string, hashPassword: string) {
    if (!bcrypt.compareSync(password, hashPassword)) {
        throw unauthorizedError("Incorrect password");
    }
}

function generateToken(id: number) {
    const SECRET = process.env.JWT_SECRET_KEY;

    const expirationData = 60 * 60 * 24 * 7;
    const config = { expiresIn: expirationData };

    const token = jwt.sign({ id }, SECRET, config);

    return token;
}
