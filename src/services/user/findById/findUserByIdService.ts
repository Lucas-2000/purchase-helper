import { UserProps } from "../../../entities/user";
import { UsersRepository } from "../../../repositories/usersRepository";

interface FindUserByIdRequest {
  id: string;
}

type FindUserByIdResponse = UserProps;

export class FindUserByIdService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: FindUserByIdRequest): Promise<FindUserByIdResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new Error("User not found");

    return user.getSummary();
  }
}
