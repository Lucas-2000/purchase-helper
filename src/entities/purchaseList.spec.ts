import { expect, test } from "vitest";
import { PurchaseList } from "./purchaseList";

test("create a purchase list", () => {
  const purchaseList = new PurchaseList({
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

  expect(purchaseList).toBeInstanceOf(PurchaseList);
});

test("cannot create a purchase list if purchaseStart is higher than purchaseFinish", () => {
  expect(
    () =>
      new PurchaseList({
        id: "1",
        listName: "Lista 1",
        products: [
          {
            id: "1",
          },
        ],
        purchaseStart: new Date(new Date().getTime() + 60 * 60 * 1000),
        purchaseFinish: new Date(),
        userId: "1",
      })
  ).toThrow();
});
