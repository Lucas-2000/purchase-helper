import { EnumUserType } from "../utils/dicts/enumUserType";
import { User } from "./user";
import { expect, test } from "vitest";

test("create an user", () => {
  const user = new User({
    id: "1",
    username: "john",
    email: "johndoe@example.com",
    password: "test123",
    type: EnumUserType.standard,
  });

  expect(user).toBeInstanceOf(User);
});
