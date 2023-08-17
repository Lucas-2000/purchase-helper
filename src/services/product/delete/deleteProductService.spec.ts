import { CreateUserService } from "./../../user/create/createUserService";
import { InMemoryUsersRepository } from "./../../../repositories/inMemory/inMemoryUsersRepository";
import { describe, expect, it } from "vitest";
import { InMemoryProductsRepository } from "../../../repositories/inMemory/inMemoryProductsRepository";
import { CreateProductService } from "../create/createProductService";
import { DeleteProductService } from "./deleteProductService";
import { EnumUserType } from "@prisma/client";

describe("Delete product", () => {
  it("should be able to delete a product", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const productsRepository = new InMemoryProductsRepository();

    const createProduct = new CreateProductService(
      productsRepository,
      usersRepository
    );

    const createUser = new CreateUserService(usersRepository);

    const deleteProduct = new DeleteProductService(productsRepository);

    await createUser.execute({
      id: "1",
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await createProduct.execute({
      id: "1",
      name: "Coca cola 2l",
      price: 9.99,
      quantity: 1,
      purchaseStart: new Date(),
      purchaseFinish: new Date(new Date().getTime() + 60 * 60 * 1000),
      userId: "1",
    });

    await expect(deleteProduct.execute({ id: "1" })).resolves.toBeInstanceOf(
      Array
    );
  });

  it("should not be able to delete a product if product not found", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const productsRepository = new InMemoryProductsRepository();

    const createProduct = new CreateProductService(
      productsRepository,
      usersRepository
    );

    const createUser = new CreateUserService(usersRepository);

    const deleteProduct = new DeleteProductService(productsRepository);

    await createUser.execute({
      id: "1",
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await createProduct.execute({
      id: "1",
      name: "Coca cola 2l",
      price: 9.99,
      quantity: 1,
      purchaseStart: new Date(),
      purchaseFinish: new Date(new Date().getTime() + 60 * 60 * 1000),
      userId: "1",
    });

    await expect(deleteProduct.execute({ id: "2" })).rejects.toBeInstanceOf(
      Error
    );
  });
});
