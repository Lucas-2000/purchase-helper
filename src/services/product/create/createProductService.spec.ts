import { InMemoryProductsRepository } from "./../../../repositories/inMemory/inMemoryProductsRepository";
import { describe, expect, it } from "vitest";
import { CreateProductService } from "./createProductService";
describe("Create product", () => {
  it("should be able to create a product", async () => {
    const productsRepository = new InMemoryProductsRepository();

    const createProduct = new CreateProductService(productsRepository);

    await expect(
      createProduct.execute({
        name: "Coca cola 2l",
        price: 9.99,
        quantity: 1,
        purchaseStart: new Date(),
        purchaseFinish: new Date(new Date().getTime() + 60 * 60 * 1000),
        userId: "1",
      })
    ).resolves.toHaveProperty("id");
  });

  it("should not be able to create a product if price is invalid", async () => {
    const productsRepository = new InMemoryProductsRepository();

    const createProduct = new CreateProductService(productsRepository);

    await expect(
      createProduct.execute({
        name: "Coca cola 2l",
        price: -9.99,
        quantity: 1,
        purchaseStart: new Date(),
        purchaseFinish: new Date(new Date().getTime() + 60 * 60 * 1000),
        userId: "1",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a product if quantity is invalid", async () => {
    const productsRepository = new InMemoryProductsRepository();

    const createProduct = new CreateProductService(productsRepository);

    await expect(
      createProduct.execute({
        name: "Coca cola 2l",
        price: 9.99,
        quantity: -1,
        purchaseStart: new Date(),
        purchaseFinish: new Date(new Date().getTime() + 60 * 60 * 1000),
        userId: "1",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a product if purchase start is higher than purchase finish", async () => {
    const productsRepository = new InMemoryProductsRepository();

    const createProduct = new CreateProductService(productsRepository);

    await expect(
      createProduct.execute({
        name: "Coca cola 2l",
        price: 9.99,
        quantity: 1,
        purchaseStart: new Date(new Date().getTime() + 60 * 60 * 1000),
        purchaseFinish: new Date(),
        userId: "1",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
