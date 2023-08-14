import { describe, expect, it } from "vitest";
import { User } from "../../../entities/user";
import { EnumUserType } from "../../../utils/dicts/enumUserType";
import { CreateUser } from "./createUserService";

describe("Create user", () => {
  it("should be able to create an user", () => {
    const createUser = new CreateUser();

    expect(
      createUser.execute({
        username: "john",
        email: "johndoe@example.com",
        password: "test1234",
        type: EnumUserType.standard,
      })
    ).resolves.toBeInstanceOf(User);
  });

  it("should not be able to create an user if password has less than 8 characters", () => {
    const createUser = new CreateUser();

    expect(
      createUser.execute({
        username: "john",
        email: "johndoe@example.com",
        password: "test123",
        type: EnumUserType.standard,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
