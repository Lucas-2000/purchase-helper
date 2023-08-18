import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { InMemoryResetPasswordRepository } from "../../../repositories/inMemory/inMemoryResetPasswordRepository";
import { CreateUserService } from "../../user/create/createUserService";
import { GenerateResetPasswordService } from "../../resetPassword/generate/generateResetPasswordService";
import { EnumUserType } from "@prisma/client";
import { SendResetPasswordEmailService } from "./sendResetPasswordEmailService";

describe("Email Send Service", () => {
  // Email comentado para não ficar enviando
  // it("should be able to send a email", async () => {
  //   const usersRepository = new InMemoryUsersRepository();
  //   const passwordResetRepository = new InMemoryPasswordResetRepository();
  //   const emailSendService = new EmailSendService(
  //     usersRepository,
  //     passwordResetRepository
  //   );
  //   const createUserService = new CreateUserService(usersRepository);
  //   const genereatePasswordResetService = new GeneratePasswordResetService(
  //     passwordResetRepository,
  //     usersRepository
  //   );

  //   await createUserService.execute({
  //     id: "1",
  //     username: "test",
  //     email: "test@example.com",
  //     password: "test123",
  //   });

  //   const body = await genereatePasswordResetService.execute({
  //     email: "test@example.com",
  //   });

  //   const strbody = body.token as string;

  //   await expect(
  //     emailSendService.execute({
  //       email: "test@example.com",
  //       body: strbody,
  //       subject: "Reset de senha",
  //     })
  //   ).resolves.toHaveProperty("body");
  // });

  it("should not be able to send a email if user not found", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const passwordResetRepository = new InMemoryResetPasswordRepository();
    const emailSendService = new SendResetPasswordEmailService(
      usersRepository,
      passwordResetRepository
    );
    const createUserService = new CreateUserService(usersRepository);
    const genereatePasswordResetService = new GenerateResetPasswordService(
      passwordResetRepository,
      usersRepository
    );

    await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    const body = await genereatePasswordResetService.execute({
      email: "test@example.com",
    });

    const strToken = body.token as string;

    await expect(
      emailSendService.execute({
        email: "test1@example.com",
        body: strToken,
        subject: "Reset de senha",
      })
    ).rejects.toBeInstanceOf(Error);
  }, 20000);

  it("should not be able to send a email if body is invalid", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const passwordResetRepository = new InMemoryResetPasswordRepository();
    const emailSendService = new SendResetPasswordEmailService(
      usersRepository,
      passwordResetRepository
    );
    const createUserService = new CreateUserService(usersRepository);
    const genereatePasswordResetService = new GenerateResetPasswordService(
      passwordResetRepository,
      usersRepository
    );

    await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    const body = await genereatePasswordResetService.execute({
      email: "test@example.com",
    });

    body.token as string;

    await expect(
      emailSendService.execute({
        email: "test1@example.com",
        body: "strbody",
        subject: "Reset de senha",
      })
    ).rejects.toBeInstanceOf(Error);
  }, 20000);
});
