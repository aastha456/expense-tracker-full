import { registerSchema, loginSchema } from './../schemas/authSchemas';
import { Router } from "express";
import * as authController from "../controllers/authController"
import { validateRequestBody } from "../middlewares/validation";


const router = Router();

router.post("/register", validateRequestBody(registerSchema),authController.register);

router.post("/login", validateRequestBody(loginSchema), authController.login);

router.post("/refresh-token", authController.refreshToken);

router.post("/logout", authController.logout);

export default router;
