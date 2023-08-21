import { PurchaseList } from "../../entities/purchaseList";
import { PurchaseListsRepository } from "../purchaseListsRepository";

export class InMemoryPurchaseListsRepository
  implements PurchaseListsRepository
{
  public purchaseLists: PurchaseList[] = [];

  async create(purchaseList: PurchaseList): Promise<void> {
    this.purchaseLists.push(purchaseList);
  }

  async findAll(): Promise<PurchaseList[]> {
    return this.purchaseLists;
  }

  async findByPurchaseListIdAndUserId(
    purchaseListId: string,
    userId: string
  ): Promise<PurchaseList | undefined> {
    const purchaseList = this.purchaseLists.find(
      (purchaseList) =>
        purchaseList.id === purchaseListId && purchaseList.userId === userId
    );

    if (!purchaseList) return;

    return purchaseList;
  }

  async findIndex(id: string): Promise<number> {
    const index = this.purchaseLists.findIndex((p) => p.id === id);

    if (index < 0) return -1;

    return index;
  }

  async update(purchaseList: PurchaseList): Promise<void> {
    const purchaseListToUpdate = this.purchaseLists.find(
      (p) => p.id === purchaseList.id
    );

    if (purchaseListToUpdate !== undefined) {
      Object.assign(purchaseListToUpdate, purchaseList);
    }
  }

  async delete(id: string): Promise<void> {
    const purchaseListIndex = this.purchaseLists.findIndex(
      (purchaseList) => purchaseList.id === id
    );

    if (purchaseListIndex !== -1) {
      this.purchaseLists.splice(purchaseListIndex, 1);
    }
  }
}
