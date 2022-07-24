import { Router } from "express";
import { handleError } from "../middlewares/handleErrorMiddleware.js";

import testRouter from "./testRouter.js";
import userRouter from "./userRouter.js";

const router = Router();
router.use(userRouter);
router.use(testRouter);
router.use(handleError);

export default router;
