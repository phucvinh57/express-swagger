import { Request, Response } from 'express';
import { userModel } from '../models/UserModel';
import { CreateUserRequest, UpdateUserRequest } from '../types/User';

export class UserController {
  // GET /users - Get all users
  getAllUsers = (req: Request, res: Response): void => {
    const users = userModel.getAllUsers();
    res.json(users);
  };

  // GET /users/:id - Get user by ID
  getUserById = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid user ID' });
      return;
    }
    
    const user = userModel.getUserById(id);
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.json(user);
  };

  // POST /users - Create new user
  createUser = (req: Request<{}, {}, CreateUserRequest>, res: Response): void => {
    const { name, email } = req.body;
    
    if (!name || !email) {
      res.status(400).json({ error: 'Name and email are required' });
      return;
    }
    
    const newUser = userModel.createUser(name, email);
    res.status(201).json(newUser);
  };

  // PUT /users/:id - Update user
  updateUser = (req: Request<{ id: string }, {}, UpdateUserRequest>, res: Response): void => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid user ID' });
      return;
    }
    
    if (!name || !email) {
      res.status(400).json({ error: 'Name and email are required' });
      return;
    }
    
    const updatedUser = userModel.updateUser(id, name, email);
    
    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.json(updatedUser);
  };

  // DELETE /users/:id - Delete user
  deleteUser = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid user ID' });
      return;
    }
    
    const deleted = userModel.deleteUser(id);
    
    if (!deleted) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.status(204).send();
  };
}

export const userController = new UserController();
