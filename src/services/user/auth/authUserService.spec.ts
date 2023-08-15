import { describe, expect, it } from "vitest";
import { AuthUserService } from "./authUserService";
import { CreateUserService } from "../create/createUserService";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { EnumUserType } from "../../../utils/dicts/enumUserType";

describe("Auth user", () => {
  it("should be able to auth an user", async () => {
    const usersRepository = new InMemoryUsersRepository();

    const authUser = new AuthUserService(usersRepository);
    const createUser = new CreateUserService(usersRepository);

    await createUser.execute({
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await expect(
      authUser.execute({
        username: "john",
        password: "test1234",
      })
    ).resolves.toHaveProperty("userSummary");

    await expect(
      authUser.execute({
        username: "john",
        password: "test1234",
      })
    ).resolves.toHaveProperty("token");
  });

  it("should not be able to auth an user if username is incorrect", async () => {
    const usersRepository = new InMemoryUsersRepository();

    const authUser = new AuthUserService(usersRepository);
    const createUser = new CreateUserService(usersRepository);

    await createUser.execute({
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await expect(
      authUser.execute({
        username: "john1",
        password: "test1234",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to auth an user if password is incorrect", async () => {
    const usersRepository = new InMemoryUsersRepository();

    const authUser = new AuthUserService(usersRepository);
    const createUser = new CreateUserService(usersRepository);

    await createUser.execute({
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await expect(
      authUser.execute({
        username: "john",
        password: "test12345",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
