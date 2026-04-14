import { Router } from "express";
import * as permissionController from "../controllers/permissionController";
import { validateRequestBody } from "../middlewares/validation";
import { createPermissionSchema } from "../schemas/permission";
import { authenticate } from "../middlewares/authenticate";
import { authorizeWithPermissions } from "../middlewares/authorizeWithPermissions";
import appPermissions from "../constants/permission";


const router  = Router();

router.post("/",authenticate, authorizeWithPermissions({ permission: appPermissions.CREATE_PERMISSIONS.name }), validateRequestBody(createPermissionSchema), permissionController.create);
router.get("/", authenticate, permissionController.getAll);

export default router;