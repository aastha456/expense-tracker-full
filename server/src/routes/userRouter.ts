import { Router } from "express";
import * as userController from "../controllers/userController";
import { authenticate, AuthRequest} from "../middlewares/authenticate";
import { authorizeWithPermissions } from "../middlewares/authorizeWithPermissions";
import appPermissions from "../constants/permission";


const router = Router();
router.get('/me', authenticate, (req: AuthRequest, res) => {
    console.log("Authentication user");

    console.log("Request", req.user);
    res.send({ user: req.user})

});

router.get("/", authenticate, authorizeWithPermissions({ permission: appPermissions.VIEW_USERS.name }), userController.getAll);



// Example of a protected route that requires "MANAGE_USERS" permission to update user roles
router.patch("/:userId/roles", authenticate, authorizeWithPermissions({ permission: appPermissions.MANAGE_USERS.name }), () => {});
router.get("/:id", userController.getById);
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);

export default router;