import { type Static, Type } from "@sinclair/typebox";
import { Router } from "express";
import { userController } from "@/controllers/user.controller";
import { CreateUserDto, UpdateUserDto, User } from "@/dtos/User";
import { createValidationMiddleware } from "@/utils/express-swagger";

const userRoutes: Router = Router();
const IdParam = Type.Object({
	id: Type.Number(),
});
type IdParam = Static<typeof IdParam>;

userRoutes.get(
	"/",
	createValidationMiddleware({
		response: { 200: Type.Array(User) },
	}),
	userController.getList,
);

userRoutes.post(
	"/",
	createValidationMiddleware({
		body: CreateUserDto,
		response: { 201: User },
	}),
	userController.create,
);

userRoutes.get<string, IdParam>(
	"/:id",
	createValidationMiddleware({
		params: IdParam,
		response: { 200: User },
	}),
	userController.getById,
);

userRoutes.put<string, IdParam>(
	"/:id",
	createValidationMiddleware({
		params: IdParam,
		body: UpdateUserDto,
		response: { 200: User },
	}),
	userController.update,
);

userRoutes.delete<string, IdParam>(
	"/:id",
	createValidationMiddleware({
		params: IdParam,
		response: { 204: Type.Undefined() },
	}),
	userController.delete,
);

export { userRoutes };
