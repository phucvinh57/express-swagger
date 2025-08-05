import { Router } from 'express';
import { userController } from '../controllers/UserController';

const router: Router = Router();

// GET /users - Get all users
router.get('/', userController.getAllUsers);

// GET /users/:id - Get user by ID
router.get('/:id', userController.getUserById);

// POST /users - Create new user
router.post('/', userController.createUser);

// PUT /users/:id - Update user
router.put('/:id', userController.updateUser);

// DELETE /users/:id - Delete user
router.delete('/:id', userController.deleteUser);

export default router;
