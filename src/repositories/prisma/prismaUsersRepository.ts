import { User } from "../../entities/user";
import { prisma } from "../../utils/config/prisma/prismaClient";
import { UsersRepository } from "../usersRepository";

export class PrismaUsersRepository implements UsersRepository {
  async create({ id, username, email, password, type }: User): Promise<void> {
    await prisma.user.create({
      data: {
        id,
        username,
        email,
        password,
        type,
      },
    });
  }

  async verifyEmailExists(email: string): Promise<boolean> {
    const emailExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return emailExists ? true : false;
  }

  async verifyUsernameExists(username: string): Promise<boolean> {
    const usernameExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    return usernameExists ? true : false;
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users.map(
      (user) =>
        new User({
          id: user.id,
          username: user.username,
          email: user.email,
          password: user.password,
          type: user.type,
        })
    );
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) return;

    return new User({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      type: user.type,
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return;

    return new User({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      type: user.type,
    });
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) return;

    return new User({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      type: user.type,
    });
  }

  async findIndex(id: string): Promise<number> {
    const users = await prisma.user.findMany();
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex < 0) return -1;

    return userIndex;
  }

  async update({ id, username, email, password, type }: User): Promise<void> {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        email,
        password,
        type,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
