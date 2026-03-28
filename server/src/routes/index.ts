import { Router } from 'express';
import authRoutes from './authRouter';
import userRoutes from './userRouter';

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
export default router;
