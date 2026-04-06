import { Router } from 'express';
import authRoutes from './authRouter';
import userRoutes from './userRouter';
import permissionRoutes from './permissionRouter';

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/permissions", permissionRoutes);
export default router;
