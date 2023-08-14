import { UsersRepository } from "./../../../repositories/usersRepository";

interface DeleteUserRequest {
  id: string;
}

type DeleteUserResponse = [];

export class DeleteUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: DeleteUserRequest): Promise<DeleteUserResponse> {
    const verifyIndex = await this.usersRepository.findIndex(id);

    if (verifyIndex < 0) throw new Error("User not found!");

    await this.usersRepository.delete(id);

    return [];
  }
}
