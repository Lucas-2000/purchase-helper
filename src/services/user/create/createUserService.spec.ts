import { describe, expect, it } from "vitest";
import { EnumUserType } from "../../../utils/dicts/enumUserType";
import { CreateUserService } from "./createUserService";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";

describe("Create user", () => {
  it("should be able to create an user", async () => {
    const usersRepository = new InMemoryUsersRepository();

    const createUser = new CreateUserService(usersRepository);

    await expect(
      createUser.execute({
        username: "john",
        email: "johndoe@example.com",
        password: "test1234",
        type: EnumUserType.standard,
      })
    ).resolves.toHaveProperty("id");
  });

  it("should not be able to create an user if password has less than 8 characters", async () => {
    const usersRepository = new InMemoryUsersRepository();

    const createUser = new CreateUserService(usersRepository);

    await expect(
      createUser.execute({
        username: "john",
        email: "johndoe@example.com",
        password: "test123",
        type: EnumUserType.standard,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create an user if username already exists", async () => {
    const usersRepository = new InMemoryUsersRepository();

    const createUser = new CreateUserService(usersRepository);

    await createUser.execute({
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await expect(
      createUser.execute({
        username: "john",
        email: "johndoe2@example.com",
        password: "test1234",
        type: EnumUserType.standard,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create an user if email already exists", async () => {
    const usersRepository = new InMemoryUsersRepository();

    const createUser = new CreateUserService(usersRepository);

    await createUser.execute({
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await expect(
      createUser.execute({
        username: "john2",
        email: "johndoe@example.com",
        password: "test1234",
        type: EnumUserType.standard,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
