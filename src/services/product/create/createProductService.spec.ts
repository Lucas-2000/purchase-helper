import { InMemoryUsersRepository } from "./../../../repositories/inMemory/inMemoryUsersRepository";
import { InMemoryProductsRepository } from "./../../../repositories/inMemory/inMemoryProductsRepository";
import { describe, expect, it } from "vitest";
import { CreateProductService } from "./createProductService";
import { CreateUserService } from "../../user/create/createUserService";
import { EnumUserType } from "@prisma/client";
describe("Create product", () => {
  it("should be able to create a product", async () => {
    const productsRepository = new InMemoryProductsRepository();
    const usersRepository = new InMemoryUsersRepository();

    const createProduct = new CreateProductService(
      productsRepository,
      usersRepository
    );

    const createUser = new CreateUserService(usersRepository);

    await createUser.execute({
      id: "1",
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await expect(
      createProduct.execute({
        name: "Coca cola 2l",
        price: 9.99,
        quantity: 1,
        userId: "1",
      })
    ).resolves.toHaveProperty("id");
  });

  it("should not be able to create a product if user not found", async () => {
    const productsRepository = new InMemoryProductsRepository();
    const usersRepository = new InMemoryUsersRepository();

    const createProduct = new CreateProductService(
      productsRepository,
      usersRepository
    );

    const createUser = new CreateUserService(usersRepository);

    await createUser.execute({
      id: "1",
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await expect(
      createProduct.execute({
        name: "Coca cola 2l",
        price: 9.99,
        quantity: 1,
        userId: "2",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a product if price is invalid", async () => {
    const productsRepository = new InMemoryProductsRepository();
    const usersRepository = new InMemoryUsersRepository();

    const createProduct = new CreateProductService(
      productsRepository,
      usersRepository
    );

    const createUser = new CreateUserService(usersRepository);

    await createUser.execute({
      id: "1",
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await expect(
      createProduct.execute({
        name: "Coca cola 2l",
        price: -9.99,
        quantity: 1,
        userId: "1",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a product if quantity is invalid", async () => {
    const productsRepository = new InMemoryProductsRepository();
    const usersRepository = new InMemoryUsersRepository();

    const createProduct = new CreateProductService(
      productsRepository,
      usersRepository
    );

    const createUser = new CreateUserService(usersRepository);

    await createUser.execute({
      id: "1",
      username: "john",
      email: "johndoe@example.com",
      password: "test1234",
      type: EnumUserType.standard,
    });

    await expect(
      createProduct.execute({
        name: "Coca cola 2l",
        price: 9.99,
        quantity: -1,
        userId: "1",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
