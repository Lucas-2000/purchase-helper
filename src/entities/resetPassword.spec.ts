import { expect, test } from "vitest";
import { ResetPassword } from "./resetPassword";
import { GenerateExpiresDate } from "../utils/dates/generateExpiresDate";
import { GenerateRandomToken } from "../utils/strings/generateRandomToken";

test("create reset password token", () => {
  const resetPassword = new ResetPassword({
    id: "1",
    token: GenerateRandomToken(10),
    expiresAt: GenerateExpiresDate(),
    userId: "1",
  });

  expect(resetPassword).toBeInstanceOf(ResetPassword);
});

test("cannot create reset password token if expires date >= expiresAt", () => {
  expect(
    () =>
      new ResetPassword({
        id: "1",
        token: GenerateRandomToken(10),
        expiresAt: new Date(),
        userId: "1",
      })
  ).toThrow();
});
