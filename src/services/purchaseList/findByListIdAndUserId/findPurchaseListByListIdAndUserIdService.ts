import { PurchaseListProps } from "../../../entities/purchaseList";
import { PurchaseListsRepository } from "../../../repositories/purchaseListsRepository";
import { UsersRepository } from "../../../repositories/usersRepository";

interface FindPurchaseListByListIdAndUserIdRequest {
  purchaseListId: string;
  userId: string;
}

type FindPurchaseListByListIdAndUserIdResponse = PurchaseListProps | undefined;

export class FindPurchaseListByListIdAndUserIdService {
  constructor(
    private purchaseListsRepository: PurchaseListsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    purchaseListId,
    userId,
  }: FindPurchaseListByListIdAndUserIdRequest): Promise<FindPurchaseListByListIdAndUserIdResponse> {
    const purchaseListExists = await this.purchaseListsRepository.findById(
      purchaseListId
    );

    if (!purchaseListExists) throw new Error("Purchase list not found");

    const usersExists = await this.usersRepository.findById(userId);

    if (!usersExists) throw new Error("User not found");

    const purchaseList =
      await this.purchaseListsRepository.findByPurchaseListIdAndUserId(
        purchaseListId,
        userId
      );

    return purchaseList?.getSummary();
  }
}
