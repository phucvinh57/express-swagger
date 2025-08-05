import { Router } from 'express';
import userRoutes from './userRoutes';

const router: Router = Router();

// Mount user routes
router.use('/users', userRoutes);

export default router;
