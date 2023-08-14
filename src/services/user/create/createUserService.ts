import { UsersRepository } from "./../../../repositories/usersRepository";
import { User, UserProps } from "../../../entities/user";
import { EnumUserType } from "../../../utils/dicts/enumUserType";
import { randomUUID } from "node:crypto";
import bcrypt from "bcrypt";

interface CreateUserRequest {
  id?: string;
  username: string;
  email: string;
  password: string;
  type: EnumUserType;
}

type CreateUserResponse = UserProps;

export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    username,
    email,
    password,
    type,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const verifyUsernameExists =
      await this.usersRepository.verifyUsernameExists(username);

    if (verifyUsernameExists) throw new Error("Username already exists");

    const verifyEmailExists = await this.usersRepository.verifyEmailExists(
      email
    );

    if (verifyEmailExists) throw new Error("Email already exists");

    if (password.length < 8)
      throw new Error("Password must be at least 8 characters");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = new User({
      id: id ?? randomUUID(),
      username,
      email,
      password: hash,
      type,
    });

    await this.usersRepository.create(user);

    return user.getSummary();
  }
}
