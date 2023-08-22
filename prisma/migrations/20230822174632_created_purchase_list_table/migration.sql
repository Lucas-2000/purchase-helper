-- CreateTable
CREATE TABLE "PurchaseList" (
    "id" TEXT NOT NULL,
    "listName" TEXT NOT NULL,
    "products" TEXT[],
    "purchaseStart" TIMESTAMP(3),
    "purchaseFinish" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "PurchaseList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PurchaseList" ADD CONSTRAINT "PurchaseList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
