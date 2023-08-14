import { User } from "../entities/user";

export interface UsersRepository {
  create(user: User): Promise<void>;
  verifyUsernameExists(username: string): Promise<boolean>;
  verifyEmailExists(email: string): Promise<boolean>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
