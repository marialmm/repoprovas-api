import { Router } from "express";

import validateJoi from "../middlewares/joiValidationMiddleware.js";
import { testSchema } from "../schemas/testSchemas.js";
import * as testController from "../controllers/testController.js"
import { validateToken } from "../middlewares/authMiddleware.js";

const testRouter = Router();

testRouter.post("/test", validateJoi(testSchema), validateToken, testController.createTest)
testRouter.get("/tests", validateToken, testController.getTests)

export default testRouter;
