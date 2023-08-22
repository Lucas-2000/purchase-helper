import { randomUUID } from "node:crypto";
import {
  ProductId,
  PurchaseList,
  PurchaseListProps,
} from "../../../entities/purchaseList";
import { PurchaseListsRepository } from "../../../repositories/purchaseListsRepository";
import { UsersRepository } from "../../../repositories/usersRepository";

interface CreatePurchaseListServiceRequest {
  id: string;
  listName: string;
  products: ProductId[];
  purchaseStart?: Date | null;
  purchaseFinish?: Date | null;
  userId: string;
}

type CreatePurchaseListServiceResponse = PurchaseListProps;

export class CreatePurchaseListService {
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
  }: CreatePurchaseListServiceRequest): Promise<CreatePurchaseListServiceResponse> {
    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) throw new Error("User not found");

    const purchaseList = new PurchaseList({
      id: id ?? randomUUID(),
      listName,
      products,
      purchaseStart,
      purchaseFinish,
      userId,
    });

    await this.purchaseListsRepository.create(purchaseList);

    return purchaseList.getSummary();
  }
}
