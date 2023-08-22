import { describe, expect, it } from "vitest";
import { InMemoryProductsRepository } from "../../../repositories/inMemory/inMemoryProductsRepository";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { InMemoryPurchaseListsRepository } from "../../../repositories/inMemory/inMemoryPurchaseListsRepository";
import { CreateProductService } from "../../product/create/createProductService";
import { CreateUserService } from "../../user/create/createUserService";
import { CreatePurchaseListService } from "../create/createPurchaseListService";
import { EnumUserType } from "@prisma/client";
import { FindAllPurchaseListsService } from "./findAllPurchaseListsService";

describe("Find all purchase lists", () => {
  it("should be able to find all purchase lists", async () => {
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

    const findAllPurchaseLists = new FindAllPurchaseListsService(
      purchaseListsRepository
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

    const purchaseList = await createPurchaseList.execute({
      id: "1",
      listName: "Lista 1",
      products: [
        {
          id: "1",
        },
      ],
      purchaseStart: new Date(),
      purchaseFinish: new Date(new Date().getTime() + 60 * 60 * 1000),
      userId: "1",
    });

    await expect(findAllPurchaseLists.execute()).resolves.toEqual([
      purchaseList,
    ]);
  });
});
