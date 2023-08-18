import { Product } from "../../entities/product";
import { prisma } from "../../utils/config/prisma/prismaClient";
import { ProductsRepository } from "../productsRepository";

export class PrismaProductsRepository implements ProductsRepository {
  async create({
    id,
    name,
    description,
    price,
    quantity,
    purchaseStart,
    purchaseFinish,
    userId,
  }: Product): Promise<void> {
    await prisma.product.create({
      data: {
        id,
        name,
        description,
        price,
        quantity,
        purchaseStart,
        purchaseFinish,
        userId,
      },
    });
  }

  async findAll(): Promise<Product[]> {
    const products = await prisma.product.findMany();

    return products.map(
      (product) =>
        new Product({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          purchaseStart: product.purchaseStart,
          purchaseFinish: product.purchaseFinish,
          userId: product.userId,
        })
    );
  }

  async findById(id: string): Promise<Product | undefined> {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) return;

    return new Product({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      purchaseStart: product.purchaseStart,
      purchaseFinish: product.purchaseFinish,
      userId: product.userId,
    });
  }

  async findByProductIdAndUserId(
    productId: string,
    userId: string
  ): Promise<Product | undefined> {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
        userId,
      },
    });

    if (!product) return;

    return new Product({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      purchaseStart: product.purchaseStart,
      purchaseFinish: product.purchaseFinish,
      userId: product.userId,
    });
  }

  async findIndex(id: string): Promise<number> {
    const products = await prisma.product.findMany();
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex < 0) return -1;

    return productIndex;
  }

  async update({
    id,
    name,
    description,
    price,
    quantity,
    purchaseStart,
    purchaseFinish,
    userId,
  }: Product): Promise<void> {
    await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        quantity,
        purchaseStart,
        purchaseFinish,
        userId,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({
      where: { id },
    });
  }
}
