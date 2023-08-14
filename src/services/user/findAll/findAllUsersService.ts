import { UserProps } from "../../../entities/user";
import { UsersRepository } from "../../../repositories/usersRepository";

type FindAllUsersResponse = UserProps[];

export class FindAllUsersService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<FindAllUsersResponse> {
    const users = await this.usersRepository.findAll();

    const usersSummary: UserProps[] = users.map((user) => user.getSummary());

    return usersSummary;
  }
}
