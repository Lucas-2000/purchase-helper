import { FindProductByUserIdAndProductIdService } from "./findProductByUserIdAndProductIdService";
import { describe, expect, it } from "vitest";
import { InMemoryProductsRepository } from "../../../repositories/inMemory/inMemoryProductsRepository";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { CreateProductService } from "../create/createProductService";
import { CreateUserService } from "../../user/create/createUserService";
import { EnumUserType } from "@prisma/client";

describe("Find product by user id and product id", () => {
  it("should be able to find a product by user id and product id", async () => {
    const productsRepository = new InMemoryProductsRepository();
    const usersRepository = new InMemoryUsersRepository();

    const createProduct = new CreateProductService(
      productsRepository,
      usersRepository
    );

    const createUser = new CreateUserService(usersRepository);

    const findProductByUserIdAndProductIdService =
      new FindProductByUserIdAndProductIdService(
        productsRepository,
        usersRepository
      );

    const user = await createUser.execute({
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

    await expect(
      findProductByUserIdAndProductIdService.execute({
        userId: user.id as string,
        productId: product.id as string,
      })
    ).resolves.toHaveProperty("id");
  });

  it("should not be able to find a product by user id and product id if user not found", async () => {
    const productsRepository = new InMemoryProductsRepository();
    const usersRepository = new InMemoryUsersRepository();

    const createProduct = new CreateProductService(
      productsRepository,
      usersRepository
    );

    const createUser = new CreateUserService(usersRepository);

    const findProductByUserIdAndProductIdService =
      new FindProductByUserIdAndProductIdService(
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

    const product = await createProduct.execute({
      name: "Coca cola 2l",
      price: 9.99,
      quantity: 1,
      userId: "1",
    });

    await expect(
      findProductByUserIdAndProductIdService.execute({
        userId: "user.id as string",
        productId: product.id as string,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to find a product by user id and product id if product not found", async () => {
    const productsRepository = new InMemoryProductsRepository();
    const usersRepository = new InMemoryUsersRepository();

    const createProduct = new CreateProductService(
      productsRepository,
      usersRepository
    );

    const createUser = new CreateUserService(usersRepository);

    const findProductByUserIdAndProductIdService =
      new FindProductByUserIdAndProductIdService(
        productsRepository,
        usersRepository
      );

    const user = await createUser.execute({
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
      userId: "1",
    });

    await expect(
      findProductByUserIdAndProductIdService.execute({
        userId: user.id as string,
        productId: "product.id as string",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
