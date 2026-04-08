import { Router } from "express";
import * as userController from "../controllers/userController";
import { authenticate, AuthRequest} from "../middlewares/authenticate";
import { authorizeWithPermissions } from "../middlewares/authorizeWithPermissions";


const router = Router();
router.get('/me', authenticate, (req: AuthRequest, res) => {
    console.log("Authentication user");

    console.log("Request", req.user);
    res.send({ user: req.user})

});

router.get("/", authenticate, authorizeWithPermissions({ permission: "VIEW_USERS" }), userController.getAll);
router.get("/:id", userController.getById);
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);

export default router;