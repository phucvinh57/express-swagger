import { userController } from '@/controllers/user.controller';
import { CreateUserDto, UpdateUserDto, User } from '@/dtos/User';
import { createRouter } from '@/utils/createRouter';
import { Type } from '@sinclair/typebox';

export const userRouter = createRouter([
  {
    path: '/',
    method: 'get',
    response: {
      200: Type.Array(User),
    },
    handler: userController.getList,
  },
  {
    path: '/:id',
    method: 'get',
    params: Type.Object({
      id: Type.String(),
    }),
    response: {
      200: User,
    },
    handler: userController.getById,
  },
  {
    path: '/',
    method: 'post',
    body: CreateUserDto,
    response: {
      201: User,
    },
    handler: userController.create,
  },
  {
    path: '/:id',
    method: 'put',
    params: Type.Object({
      id: Type.String(),
    }),
    body: UpdateUserDto,
    response: {
      200: User,
    },
    handler: userController.update,
  },
  {
    path: '/:id',
    method: 'delete',
    params: Type.Object({
      id: Type.String(),
    }),
    response: {
      204: Type.Undefined(),
    },
    handler: userController.delete,
  },
]);