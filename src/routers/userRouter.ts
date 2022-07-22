import { Router } from "express";

import * as userController from "../controllers/userController.js";
import validateJoi from "../middlewares/joiValidationMiddleware.js";
import { signupSchema } from "../schemas/userSchemas.js";

const userRouter = Router();

userRouter.post("/sign-up", validateJoi(signupSchema), userController.signup);

export default userRouter;
