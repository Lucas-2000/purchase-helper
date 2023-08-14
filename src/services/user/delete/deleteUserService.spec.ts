import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { CreateUserService } from "../create/createUserService";
import { DeleteUserService } from "./deleteUserService";
import { EnumUserType } from "../../../utils/dicts/enumUserType";

describe("Delete user", () => {
  it("should be able to delete an user", async () => {
    const usersRepository = new InMemoryUsersRepository();

    const createUser = new CreateUserService(usersRepository);
    const deleteUser = new DeleteUserService(usersRepository);

    await createUser.execute({
      id: "1",
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await expect(
      deleteUser.execute({
        id: "1",
      })
    ).resolves.toBeInstanceOf(Array);
  });

  it("should not be able to delete an user if user not found", async () => {
    const usersRepository = new InMemoryUsersRepository();

    const createUser = new CreateUserService(usersRepository);
    const deleteUser = new DeleteUserService(usersRepository);

    await createUser.execute({
      id: "1",
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await expect(
      deleteUser.execute({
        id: "2",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
