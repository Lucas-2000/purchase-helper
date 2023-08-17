import { expect, test } from "vitest";
import { Email } from "./email";

test("create email", () => {
  const email = new Email({
    email: "test@example.com",
    token: "ijsfafjaofs",
    subject: "Reset de senha",
  });

  expect(email).instanceOf(Email);
});
