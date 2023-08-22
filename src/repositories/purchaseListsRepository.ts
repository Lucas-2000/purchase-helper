import { PurchaseList } from "../entities/purchaseList";

export interface PurchaseListsRepository {
  create(purchaseList: PurchaseList): Promise<void>;
  findAll(): Promise<PurchaseList[]>;
  findById(id: string): Promise<PurchaseList | undefined>;
  findByPurchaseListIdAndUserId(
    purchaseListId: string,
    userId: string
  ): Promise<PurchaseList | undefined>;
  findIndex(id: string): Promise<number>;
  update(purchaseList: PurchaseList): Promise<void>;
  delete(id: string): Promise<void>;
}
