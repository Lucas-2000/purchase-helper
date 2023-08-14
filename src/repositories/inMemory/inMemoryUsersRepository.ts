import { User } from "../../entities/user";
import { UsersRepository } from "../usersRepository";

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async verifyEmailExists(email: string): Promise<boolean> {
    const user = this.users.find((user) => user.email === email);

    return user ? true : false;
  }

  async verifyUsernameExists(username: string): Promise<boolean> {
    const user = this.users.find((user) => user.username === username);

    return user ? true : false;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.username === username);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async findIndex(id: string): Promise<number> {
    const index = this.users.findIndex((user) => user.id === id);

    if (index < 0) return -1;

    return index;
  }

  async update(user: User): Promise<void> {
    const userToUpdate = this.users.find((u) => u.id === user.id);

    if (userToUpdate !== undefined) {
      Object.assign(userToUpdate, user);
    }
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
    }
  }
}
