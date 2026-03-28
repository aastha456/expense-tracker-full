import { Router } from "express";
import * as authController from "../controllers/authControllers"

const router = Router();

router.post("/register", authController.register);

router.post("/login", () => {});

router.post("/refresh-token", () => {});

router.post("/logout", () => {});

export default router;
