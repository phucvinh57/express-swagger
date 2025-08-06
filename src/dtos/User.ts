import { type Static, Type } from "@sinclair/typebox";

export const User = Type.Object({
	id: Type.Number(),
	name: Type.String(),
	email: Type.String(),
});
export type User = Static<typeof User>;
export const CreateUserDto = Type.Object({
	name: Type.String(),
	email: Type.String(),
});
export type CreateUserDto = Static<typeof CreateUserDto>;
export const UpdateUserDto = Type.Object({
	name: Type.String(),
	email: Type.String(),
});
export type UpdateUserDto = Static<typeof UpdateUserDto>;
