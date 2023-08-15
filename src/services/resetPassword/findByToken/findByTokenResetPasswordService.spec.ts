import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { InMemoryResetPasswordRepository } from "../../../repositories/inMemory/inMemoryResetPasswordRepository";
import { CreateUserService } from "../../user/create/createUserService";
import { GenerateResetPasswordService } from "../generate/generateResetPasswordService";
import { EnumUserType } from "../../../utils/dicts/enumUserType";
import { FindByTokenResetPasswordService } from "./findByTokenResetPasswordService";

describe("Find by token reset password", () => {
  it("should be able to find by token a reset password", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const resetPasswordRepository = new InMemoryResetPasswordRepository();

    const createUser = new CreateUserService(usersRepository);
    const generateResetPassword = new GenerateResetPasswordService(
      resetPasswordRepository,
      usersRepository
    );
    const findByTokenResetPassword = new FindByTokenResetPasswordService(
      resetPasswordRepository
    );

    const user = await createUser.execute({
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    const reset = await generateResetPassword.execute({ email: user.email });

    await expect(
      findByTokenResetPassword.execute({ token: reset.token as string })
    ).resolves.toHaveProperty("id");
  });

  it("should not be able to find by token a reset password if token not found", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const resetPasswordRepository = new InMemoryResetPasswordRepository();

    const createUser = new CreateUserService(usersRepository);
    const generateResetPassword = new GenerateResetPasswordService(
      resetPasswordRepository,
      usersRepository
    );
    const findByTokenResetPassword = new FindByTokenResetPasswordService(
      resetPasswordRepository
    );

    const user = await createUser.execute({
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await generateResetPassword.execute({ email: user.email });

    await expect(
      findByTokenResetPassword.execute({ token: "reset.token as string" })
    ).rejects.toBeInstanceOf(Error);
  });
});
