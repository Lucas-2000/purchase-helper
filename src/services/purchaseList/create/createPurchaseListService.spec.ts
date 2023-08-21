import { describe, expect, it } from "vitest";
import { CreateUserService } from "../../user/create/createUserService";
import { InMemoryProductsRepository } from "../../../repositories/inMemory/inMemoryProductsRepository";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { CreateProductService } from "../../product/create/createProductService";
import { EnumUserType } from "@prisma/client";
import { InMemoryPurchaseListsRepository } from "../../../repositories/inMemory/inMemoryPurchaseListsRepository";
import { CreatePurchaseListService } from "./createPurchaseListService";

describe("Create purchase list", () => {
  it("should be able to create a purchase list", async () => {
    const productsRepository = new InMemoryProductsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const purchaseListsRepository = new InMemoryPurchaseListsRepository();

    const createProduct = new CreateProductService(
      productsRepository,
      usersRepository
    );

    const createUser = new CreateUserService(usersRepository);

    const createPurchaseList = new CreatePurchaseListService(
      purchaseListsRepository,
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
      userId: "1",
    });

    await expect(
      createPurchaseList.execute({
        id: "1",
        listName: "Lista 1",
        products: [
          {
            name: "Coca cola 2l",
            price: 9.99,
            quantity: 1,
            userId: "1",
          },
        ],
        purchaseStart: new Date(),
        purchaseFinish: new Date(new Date().getTime() + 60 * 60 * 1000),
        userId: "1",
      })
    ).resolves.toHaveProperty("id");
  });

  it("should not be able to create a purchase list if user not found", async () => {
    const productsRepository = new InMemoryProductsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const purchaseListsRepository = new InMemoryPurchaseListsRepository();

    const createProduct = new CreateProductService(
      productsRepository,
      usersRepository
    );

    const createUser = new CreateUserService(usersRepository);

    const createPurchaseList = new CreatePurchaseListService(
      purchaseListsRepository,
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
      userId: "1",
    });

    await expect(
      createPurchaseList.execute({
        id: "1",
        listName: "Lista 1",
        products: [
          {
            name: "Coca cola 2l",
            price: 9.99,
            quantity: 1,
            userId: "1",
          },
        ],
        purchaseStart: new Date(),
        purchaseFinish: new Date(new Date().getTime() + 60 * 60 * 1000),
        userId: "2",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a purchase list if purchase finish is higher than purchase start", async () => {
    const productsRepository = new InMemoryProductsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const purchaseListsRepository = new InMemoryPurchaseListsRepository();

    const createProduct = new CreateProductService(
      productsRepository,
      usersRepository
    );

    const createUser = new CreateUserService(usersRepository);

    const createPurchaseList = new CreatePurchaseListService(
      purchaseListsRepository,
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
      userId: "1",
    });

    await expect(
      createPurchaseList.execute({
        id: "1",
        listName: "Lista 1",
        products: [
          {
            name: "Coca cola 2l",
            price: 9.99,
            quantity: 1,
            userId: "1",
          },
        ],
        purchaseStart: new Date(new Date().getTime() + 60 * 60 * 1000),
        purchaseFinish: new Date(),
        userId: "1",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
