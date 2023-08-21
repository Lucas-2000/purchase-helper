/*
  Warnings:

  - You are about to drop the column `purchaseFinish` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseStart` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "purchaseFinish",
DROP COLUMN "purchaseStart";
