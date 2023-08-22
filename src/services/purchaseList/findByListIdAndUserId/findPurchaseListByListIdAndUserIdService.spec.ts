import { describe, expect, it } from "vitest";
import { InMemoryProductsRepository } from "../../../repositories/inMemory/inMemoryProductsRepository";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { InMemoryPurchaseListsRepository } from "../../../repositories/inMemory/inMemoryPurchaseListsRepository";
import { CreateProductService } from "../../product/create/createProductService";
import { CreateUserService } from "../../user/create/createUserService";
import { CreatePurchaseListService } from "../create/createPurchaseListService";
import { FindPurchaseListByListIdAndUserIdService } from "./findPurchaseListByListIdAndUserIdService";
import { EnumUserType } from "@prisma/client";

describe("Find purchase list by list and user id", () => {
  it("should be able to find a purchase list", async () => {
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

    const findPurchaseListByListIdAndUserIdService =
      new FindPurchaseListByListIdAndUserIdService(
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

    await createPurchaseList.execute({
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
    });

    await expect(
      findPurchaseListByListIdAndUserIdService.execute({
        purchaseListId: "1",
        userId: "1",
      })
    ).resolves.toHaveProperty("id");
  });

  it("should not be able to find a purchase list if purchase list not found", async () => {
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

    const findPurchaseListByListIdAndUserIdService =
      new FindPurchaseListByListIdAndUserIdService(
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

    await createPurchaseList.execute({
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
    });

    await expect(
      findPurchaseListByListIdAndUserIdService.execute({
        purchaseListId: "2",
        userId: "1",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to find a purchase list if user not found", async () => {
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

    const findPurchaseListByListIdAndUserIdService =
      new FindPurchaseListByListIdAndUserIdService(
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

    await createPurchaseList.execute({
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
    });

    await expect(
      findPurchaseListByListIdAndUserIdService.execute({
        purchaseListId: "1",
        userId: "2",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
