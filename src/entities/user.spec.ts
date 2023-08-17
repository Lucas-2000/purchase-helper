import { EnumUserType } from "@prisma/client";
import { User } from "./user";
import { expect, test } from "vitest";

test("create an user", () => {
  const user = new User({
    id: "1",
    username: "john",
    email: "johndoe@example.com",
    password: "test1234",
    type: EnumUserType.standard,
  });

  expect(user).toBeInstanceOf(User);
});

test("cannot create an user with password less than 8 characters", () => {
  expect(() => {
    return new User({
      id: "1",
      username: "john",
      email: "johndoe@example.com",
      password: "test123",
      type: EnumUserType.standard,
    });
  }).toThrow();
});
