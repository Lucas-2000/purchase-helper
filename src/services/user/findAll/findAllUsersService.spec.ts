import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { FindAllUsersService } from "./findAllUsersService";
import { CreateUser } from "../create/createUserService";
import { EnumUserType } from "../../../utils/dicts/enumUserType";

describe("Find all users", () => {
  it("should be able to find all users", async () => {
    const usersRepository = new InMemoryUsersRepository();

    const findAllUsers = new FindAllUsersService(usersRepository);

    const createUser = new CreateUser(usersRepository);

    const user = await createUser.execute({
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await expect(findAllUsers.execute()).resolves.toEqual([user]);
  });
});
