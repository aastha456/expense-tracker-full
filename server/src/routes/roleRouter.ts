import { Router } from "express";
import * as roleController from "../controllers/roleController";
import { validateRequestBody } from "../middlewares/validation";
import { createRoleSchema } from "../schemas/roleSchemas";
import { authorizeWithPermissions } from "../middlewares/authorizeWithPermissions";
import appPermissions from "../constants/permission";


const router  = Router();

router.post("/", authorizeWithPermissions({ permission: appPermissions.CREATE_ROLES.name }), validateRequestBody(createRoleSchema), roleController.create);

router.get("/", roleController.getAll);

export default router;