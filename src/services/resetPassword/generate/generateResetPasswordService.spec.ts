import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { InMemoryResetPasswordRepository } from "./../../../repositories/inMemory/inMemoryResetPasswordRepository";
import { CreateUserService } from "../../user/create/createUserService";
import { EnumUserType } from "../../../utils/dicts/enumUserType";
import { GenerateResetPasswordService } from "./generateResetPasswordService";

describe("Generate reset password", () => {
  it("should be able to generate reset password", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const resetPasswordRepository = new InMemoryResetPasswordRepository();

    const createUser = new CreateUserService(usersRepository);
    const resetPassword = new GenerateResetPasswordService(
      resetPasswordRepository,
      usersRepository
    );

    const user = await createUser.execute({
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await expect(
      resetPassword.execute({ email: user.email })
    ).resolves.toHaveProperty("id");
  });

  it("should not be able to generate reset password if email not found", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const resetPasswordRepository = new InMemoryResetPasswordRepository();

    const createUser = new CreateUserService(usersRepository);
    const resetPassword = new GenerateResetPasswordService(
      resetPasswordRepository,
      usersRepository
    );

    await createUser.execute({
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await expect(
      resetPassword.execute({ email: "user.email" })
    ).rejects.toBeInstanceOf(Error);
  });
});
