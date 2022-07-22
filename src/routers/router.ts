import { Router } from "express";
import { handleError } from "../middlewares/handleErrorMiddleware.js";

import userRouter from "./userRouter.js";

const router = Router();
router.use(userRouter);
router.use(handleError);

export default router;
