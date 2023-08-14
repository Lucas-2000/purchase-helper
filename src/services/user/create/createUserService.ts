import { User } from "../../../entities/user";
import { EnumUserType } from "../../../utils/dicts/enumUserType";

interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  type: EnumUserType;
}

type CreateUserResponse = User;

export class CreateUser {
  async execute({
    username,
    email,
    password,
    type,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const user = new User({
      username,
      email,
      password,
      type,
    });

    return user;
  }
}
