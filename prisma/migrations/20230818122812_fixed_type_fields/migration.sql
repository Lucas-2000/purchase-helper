-- AlterTable
ALTER TABLE "products" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "purchaseStart" DROP NOT NULL,
ALTER COLUMN "purchaseFinish" DROP NOT NULL;
