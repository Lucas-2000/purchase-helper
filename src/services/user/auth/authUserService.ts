import { compare } from "bcrypt";
import { UserProps } from "./../../../entities/user";
import { UsersRepository } from "./../../../repositories/usersRepository";
import { sign } from "jsonwebtoken";
import { jwtSecret } from "../../../utils/config/jwt/jwtConfig";

interface AuthUserRequest {
  username: string;
  password: string;
}

type AuthUserResponse = { userSummary: UserProps; token: string };

export class AuthUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    username,
    password,
  }: AuthUserRequest): Promise<AuthUserResponse> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) throw new Error("User or password incorrect");

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new Error("User or password incorrect");

    if (!jwtSecret) throw new Error("JWT Key not found!");

    const token = sign({}, jwtSecret, {
      subject: user.id,
      expiresIn: "12h",
    });

    const userSummary = user.getSummary();

    return { userSummary, token };
  }
}
