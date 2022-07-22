import Joi from "joi";
import { User } from "@prisma/client";

export type SignupBody = User & {
    confirmPassword: String;
};

export const signupSchema = Joi.object<SignupBody>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref("password"),
});
