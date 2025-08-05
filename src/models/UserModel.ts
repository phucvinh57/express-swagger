import { User } from '@/dtos/User';

class UserModel {
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];
  private nextId = 3;

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }

  createUser(name: string, email: string): User {
    const newUser: User = {
      id: this.nextId++,
      name,
      email
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, name: string, email: string): User | null {
    const userIndex = this.users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return null;
    }
    
    this.users[userIndex] = { id, name, email };
    return this.users[userIndex];
  }

  deleteUser(id: number): boolean {
    const userIndex = this.users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return false;
    }
    
    this.users.splice(userIndex, 1);
    return true;
  }
}

export const userModel = new UserModel();
