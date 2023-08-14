import { UsersRepository } from "./../../../repositories/usersRepository";
import { User, UserProps } from "../../../entities/user";
import { EnumUserType } from "../../../utils/dicts/enumUserType";

interface CreateUserRequest {
  id?: string;
  username: string;
  email: string;
  password: string;
  type: EnumUserType;
}

type CreateUserResponse = UserProps;

export class CreateUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
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

    const user = new User({
      username,
      email,
      password,
      type,
    });

    await this.usersRepository.create(user);

    return user.getSummary();
  }
}
