import { expect, test } from "vitest";
import { Product } from "./product";

test("create a product", () => {
  const product = new Product({
    name: "Coca cola 2l",
    price: 9.99,
    quantity: 1,
    purchaseStart: new Date(),
    purchaseFinish: new Date(new Date().getTime() + 60 * 60 * 1000),
    userId: "1",
  });

  expect(product).toBeInstanceOf(Product);
});

test("cannot create a product if price less than 0", () => {
  expect(
    () =>
      new Product({
        name: "Coca cola 2l",
        price: -1,
        quantity: 1,
        purchaseStart: new Date(),
        purchaseFinish: new Date(new Date().getTime() + 60 * 60 * 1000),
        userId: "1",
      })
  ).toThrow();
});

test("cannot create a product if quantity less than 0", () => {
  expect(
    () =>
      new Product({
        name: "Coca cola 2l",
        price: 9.99,
        quantity: -1,
        purchaseStart: new Date(),
        purchaseFinish: new Date(new Date().getTime() + 60 * 60 * 1000),
        userId: "1",
      })
  ).toThrow();
});

test("cannot create a product if purchaseStart is higher than purchaseFinish", () => {
  expect(
    () =>
      new Product({
        name: "Coca cola 2l",
        price: 9.99,
        quantity: 1,
        purchaseStart: new Date(new Date().getTime() + 60 * 60 * 1000),
        purchaseFinish: new Date(),
        userId: "1",
      })
  ).toThrow();
});
