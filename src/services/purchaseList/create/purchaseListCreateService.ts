import { ProductProps } from "../../../entities/product";
import { PurchaseListProps } from "../../../entities/purchaseList";

interface PurchaseListCreateRequest {
  id: string;
  listName: string;
  products: ProductProps[];
  purchaseStart?: Date | null;
  purchaseFinish?: Date | null;
  userId: string;
}

type PurchaseListCreateResponse = PurchaseListProps;

export class PurchaseListCreateService {}
