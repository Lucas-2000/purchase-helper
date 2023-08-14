import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { CreateUser } from "../create/createUserService";
import { FindUserByIdService } from "./findUserByIdService";
import { EnumUserType } from "../../../utils/dicts/enumUserType";

describe("Find user by id", () => {
  it("should be able to find a user by id", async () => {
    const usersRepository = new InMemoryUsersRepository();

    const findUserById = new FindUserByIdService(usersRepository);

    const createUser = new CreateUser(usersRepository);

    await createUser.execute({
      id: "1",
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await expect(findUserById.execute({ id: "1" })).resolves.toHaveProperty(
      "id"
    );
  });

  it("should not be able to find a user by id if user not found", async () => {
    const usersRepository = new InMemoryUsersRepository();

    const findUserById = new FindUserByIdService(usersRepository);

    const createUser = new CreateUser(usersRepository);

    await createUser.execute({
      id: "1",
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await expect(findUserById.execute({ id: "2" })).rejects.toBeInstanceOf(
      Error
    );
  });
});
