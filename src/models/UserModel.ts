import type { User } from "@/dtos/User";

const users: User[] = [
	{ id: 1, name: "John Doe", email: "john@example.com" },
	{ id: 2, name: "Jane Smith", email: "jane@example.com" },
];
let nextId = 3;

const getAllUsers = (): User[] => {
	return users;
};

const getUserById = (id: number): User | undefined => {
	return users.find((u) => u.id === id);
};

const createUser = (name: string, email: string): User => {
	const newUser: User = {
		id: nextId++,
		name,
		email,
	};
	users.push(newUser);
	return newUser;
};

const updateUser = (id: number, name: string, email: string): User | null => {
	const userIndex = users.findIndex((u) => u.id === id);

	if (userIndex === -1) {
		return null;
	}

	users[userIndex] = { id, name, email };
	return users[userIndex];
};

const deleteUser = (id: number): boolean => {
	const userIndex = users.findIndex((u) => u.id === id);

	if (userIndex === -1) {
		return false;
	}

	users.splice(userIndex, 1);
	return true;
};

export const userModel = {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
};
