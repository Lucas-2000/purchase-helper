import { describe, expect, it } from "vitest";
import { InMemoryProductsRepository } from "../../../repositories/inMemory/inMemoryProductsRepository";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { CreateProductService } from "../create/createProductService";
import { CreateUserService } from "../../user/create/createUserService";
import { FindAllProductsService } from "./findAllProductsService";
import { EnumUserType } from "@prisma/client";

describe("Find all produts", () => {
  it("should be able to find all users", async () => {
    const productsRepository = new InMemoryProductsRepository();
    const usersRepository = new InMemoryUsersRepository();

    const createProduct = new CreateProductService(
      productsRepository,
      usersRepository
    );

    const createUser = new CreateUserService(usersRepository);

    const findAllProducts = new FindAllProductsService(productsRepository);

    await createUser.execute({
      id: "1",
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    const product = await createProduct.execute({
      name: "Coca cola 2l",
      price: 9.99,
      quantity: 1,
      userId: "1",
    });

    await expect(findAllProducts.execute()).resolves.toEqual([product]);
  });
});
