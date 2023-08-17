import { describe, expect, it } from "vitest";
import { InMemoryProductsRepository } from "../../../repositories/inMemory/inMemoryProductsRepository";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { CreateProductService } from "../create/createProductService";
import { CreateUserService } from "../../user/create/createUserService";
import { UpdateProductService } from "./updateProductService";
import { EnumUserType } from "@prisma/client";

describe("Update product service", () => {
  it("should be able to update a product", async () => {
    const productsRepository = new InMemoryProductsRepository();
    const usersRepository = new InMemoryUsersRepository();

    const createProduct = new CreateProductService(
      productsRepository,
      usersRepository
    );

    const createUser = new CreateUserService(usersRepository);

    const updateProduct = new UpdateProductService(
      productsRepository,
      usersRepository
    );

    await createUser.execute({
      id: "1",
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await createProduct.execute({
      name: "Coca cola 2l",
      price: 9.99,
      quantity: 1,
      purchaseStart: new Date(),
      purchaseFinish: new Date(new Date().getTime() + 60 * 60 * 1000),
      userId: "1",
    });

    await expect(
      updateProduct.execute({
        id: "1",
        name: "Coca cola 2l",
        price: 9.99,
        quantity: 1,
        purchaseStart: new Date(),
        purchaseFinish: new Date(new Date().getTime() + 60 * 60 * 1000),
        userId: "1",
      })
    ).resolves.toHaveProperty("id");
  });

  it("should not be able to update a product if product not found", async () => {
    const productsRepository = new InMemoryProductsRepository();
    const usersRepository = new InMemoryUsersRepository();

    const createProduct = new CreateProductService(
      productsRepository,
      usersRepository
    );

    const createUser = new CreateUserService(usersRepository);

    const updateProduct = new UpdateProductService(
      productsRepository,
      usersRepository
    );

    await createUser.execute({
      id: "1",
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await createProduct.execute({
      name: "Coca cola 2l",
      price: 9.99,
      quantity: 1,
      purchaseStart: new Date(),
      purchaseFinish: new Date(new Date().getTime() + 60 * 60 * 1000),
      userId: "1",
    });

    await expect(
      updateProduct.execute({
        id: "2",
        name: "Coca cola 2l",
        price: 9.99,
        quantity: 1,
        purchaseStart: new Date(),
        purchaseFinish: new Date(new Date().getTime() + 60 * 60 * 1000),
        userId: "1",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to update a product if user not found", async () => {
    const productsRepository = new InMemoryProductsRepository();
    const usersRepository = new InMemoryUsersRepository();

    const createProduct = new CreateProductService(
      productsRepository,
      usersRepository
    );

    const createUser = new CreateUserService(usersRepository);

    const updateProduct = new UpdateProductService(
      productsRepository,
      usersRepository
    );

    await createUser.execute({
      id: "1",
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await createProduct.execute({
      name: "Coca cola 2l",
      price: 9.99,
      quantity: 1,
      purchaseStart: new Date(),
      purchaseFinish: new Date(new Date().getTime() + 60 * 60 * 1000),
      userId: "1",
    });

    await expect(
      updateProduct.execute({
        id: "1",
        name: "Coca cola 2l",
        price: 9.99,
        quantity: 1,
        purchaseStart: new Date(),
        purchaseFinish: new Date(new Date().getTime() + 60 * 60 * 1000),
        userId: "2",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
