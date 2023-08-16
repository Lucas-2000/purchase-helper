import { UsersRepository } from "./../../../repositories/usersRepository";

interface DeleteUserRequest {
  id: string;
}

type DeleteUserResponse = [];

export class DeleteUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: DeleteUserRequest): Promise<DeleteUserResponse> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) throw new Error("User not found!");

    await this.usersRepository.delete(id);

    return [];
  }
}
