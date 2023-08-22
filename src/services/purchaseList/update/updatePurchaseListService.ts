import {
  ProductId,
  PurchaseList,
  PurchaseListProps,
} from "../../../entities/purchaseList";
import { PurchaseListsRepository } from "../../../repositories/purchaseListsRepository";
import { UsersRepository } from "../../../repositories/usersRepository";

interface UpdatePurchaseListRequest {
  id: string;
  listName: string;
  products: ProductId[];
  purchaseStart?: Date | null;
  purchaseFinish?: Date | null;
  userId: string;
}

type UpdatePurchaseListResponse = PurchaseListProps;

export class UpdatePurchaseListService {
  constructor(
    private purchaseListsRepository: PurchaseListsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    id,
    listName,
    products,
    purchaseStart,
    purchaseFinish,
    userId,
  }: UpdatePurchaseListRequest): Promise<UpdatePurchaseListResponse> {
    const purchaseListExists = await this.purchaseListsRepository.findById(id);

    if (!purchaseListExists) throw new Error("Purchase list not found");

    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) throw new Error("User not found");

    const purchaseList = new PurchaseList({
      id,
      listName,
      products,
      purchaseStart,
      purchaseFinish,
      userId,
    });

    await this.purchaseListsRepository.update(purchaseList);

    return purchaseList.getSummary();
  }
}
