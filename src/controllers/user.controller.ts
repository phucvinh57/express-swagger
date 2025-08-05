import { Request, Response } from 'express';
import { userModel } from '@/models/UserModel';
import { CreateUserDto, UpdateUserDto, User } from '@/dtos/User';
import { Handler } from '@/interfaces/handler';

const getList: Handler<{ Resp: User[] }> = (req, res) => {
  const users = userModel.getAllUsers();
  res.json(users);
}

const getById: Handler<{ Params: { id: number }, Resp: User }> = (req, res) => {
  const user = userModel.getUserById(req.params.id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.json(user);
}

const create: Handler<{ Body: CreateUserDto, Resp: User }> = (req, res) => {
  const newUser = userModel.createUser(req.body.name, req.body.email);
  res.status(201).json(newUser);
}

const update: Handler<{ Params: { id: number }, Body: UpdateUserDto, Resp: User }> = (req, res) => {
  const updatedUser = userModel.updateUser(req.params.id, req.body.name, req.body.email);
  if (!updatedUser) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.json(updatedUser);
}

const deleteUser: Handler<{ Params: { id: number } }> = (req, res) => {
  const deleted = userModel.deleteUser(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.status(204).send();
}

export const userController = {
  getList,
  getById,
  create,
  update,
  delete: deleteUser
}
