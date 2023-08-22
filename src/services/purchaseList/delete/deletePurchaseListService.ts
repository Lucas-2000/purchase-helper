import { PurchaseListsRepository } from "../../../repositories/purchaseListsRepository";

interface DeletePurchaseListRequest {
  id: string;
}

type DeletePurchaseListResponse = [];

export class DeletePurchaseListService {
  constructor(private purchaseListsRepository: PurchaseListsRepository) {}

  async execute({
    id,
  }: DeletePurchaseListRequest): Promise<DeletePurchaseListResponse> {
    const purchaseListExists = await this.purchaseListsRepository.findById(id);

    if (!purchaseListExists) throw new Error("Purchase list not found");

    await this.purchaseListsRepository.delete(id);

    return [];
  }
}
