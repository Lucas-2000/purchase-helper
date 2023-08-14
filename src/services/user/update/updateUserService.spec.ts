import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { CreateUserService } from "../create/createUserService";
import { EnumUserType } from "../../../utils/dicts/enumUserType";
import { UpdateUserService } from "./updateUserService";

describe("Update user", () => {
  it("should be able to update an user", async () => {
    const usersRepository = new InMemoryUsersRepository();

    const createUser = new CreateUserService(usersRepository);
    const updateUser = new UpdateUserService(usersRepository);

    await createUser.execute({
      id: "1",
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await expect(
      updateUser.execute({
        id: "1",
        username: "john",
        email: "johndoe@example.com",
        password: "test1234",
        type: EnumUserType.standard,
      })
    ).resolves.toHaveProperty("id");
  });

  it("should not be able to update an user if user not found", async () => {
    const usersRepository = new InMemoryUsersRepository();

    const createUser = new CreateUserService(usersRepository);
    const updateUser = new UpdateUserService(usersRepository);

    await createUser.execute({
      id: "1",
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await expect(
      updateUser.execute({
        id: "2",
        username: "john",
        email: "johndoe@example.com",
        password: "test1234",
        type: EnumUserType.standard,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
