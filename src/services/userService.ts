import * as userRepository from "../repositories/userRepository.js";
import { conflictError } from "../utils/errorUtils.js";

export async function signup(userData: userRepository.CreateUserData) {
    const { email } = userData;

    const user = await userRepository.getByEmail(email);

    if (user) {
        throw conflictError("Email is already in use");
    }

    await userRepository.signup(userData);
}
