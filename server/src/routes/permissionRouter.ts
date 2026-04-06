import { Router } from "express";
import * as permissionController from "../controllers/permissionController";
import { validateRequestBody } from "../middlewares/validation";
import { createPermissionSchema } from "../schemas/permission";
import { authenticate } from "../middlewares/authenticate";


const router  = Router();

router.post("/",authenticate, validateRequestBody(createPermissionSchema), permissionController.create)

export default router;