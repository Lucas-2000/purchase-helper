import { EnumUserType } from "@prisma/client";
import { User, UserProps } from "../../../entities/user";
import { UsersRepository } from "../../../repositories/usersRepository";
import bcrypt from "bcrypt";

interface UpdateUserRequest {
  id: string;
  username: string;
  email: string;
  password: string;
  type: EnumUserType;
}

type UpdateUserResponse = UserProps;

export class UpdateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    username,
    email,
    password,
    type,
  }: UpdateUserRequest): Promise<UpdateUserResponse> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) throw new Error("User not found!");

    if (password) {
      if (password.length < 8)
        throw new Error("Password must be at least 8 characters");

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const user = new User({
        id,
        username,
        email,
        password: hash,
        type,
      });

      await this.usersRepository.update(user);

      return user.getSummary();
    }

    const user = new User({
      id,
      username,
      email,
      password,
      type,
    });

    await this.usersRepository.update(user);

    return user.getSummary();
  }
}
