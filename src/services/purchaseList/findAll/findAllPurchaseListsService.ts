import { PurchaseListProps } from "../../../entities/purchaseList";
import { PurchaseListsRepository } from "../../../repositories/purchaseListsRepository";

type FindAllPurchaseListsResponse = PurchaseListProps[];

export class FindAllPurchaseListsService {
  constructor(private purchaseListsRepository: PurchaseListsRepository) {}

  async execute(): Promise<FindAllPurchaseListsResponse> {
    const purchaseLists = await this.purchaseListsRepository.findAll();

    const purchaseListsSummary: PurchaseListProps[] = purchaseLists.map(
      (purchaseList) => purchaseList.getSummary()
    );

    return purchaseListsSummary;
  }
}
