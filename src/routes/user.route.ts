import { Router } from 'express';
import { userController } from '@/controllers/user.controller';
import { CreateUserDto, UpdateUserDto, User } from '@/dtos/User';
import { createValidationMiddleware } from '@/utils/express-swagger';
import { Type } from '@sinclair/typebox';

const userRoutes: Router = Router();
userRoutes.get('/', createValidationMiddleware({
  response: { 200: Type.Array(User) },
}), userController.getList);

userRoutes.post('/', createValidationMiddleware({
  body: CreateUserDto,
  response: { 201: User },
}), userController.create);

userRoutes.get<string, any>('/:id', createValidationMiddleware({
  params: Type.Object({ id: Type.Number() }),
  response: { 200: User },
}), userController.getById);

userRoutes.put<string, any>('/:id', createValidationMiddleware({
  params: Type.Object({ id: Type.Number() }),
  body: UpdateUserDto,
  response: { 200: User },
}), userController.update);

userRoutes.delete<string, any>('/:id', createValidationMiddleware({
  params: Type.Object({ id: Type.Number() }),
  response: { 204: Type.Undefined() },
}), userController.delete);

export { userRoutes };