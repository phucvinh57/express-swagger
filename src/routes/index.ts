import { Router } from 'express';
import { userRouter } from './userRoutes';

const router: Router = Router();

// Mount user routes
router.use('/users', userRouter);

export default router;
