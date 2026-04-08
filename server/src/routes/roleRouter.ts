import { Router } from "express";
import * as roleController from "../controllers/roleController";
import { validateRequestBody } from "../middlewares/validation";
import { createRoleSchema } from "../schemas/roleSchemas";


const router  = Router();

router.post("/", validateRequestBody(createRoleSchema), roleController.create);

router.get("/", roleController.getAll);

export default router;