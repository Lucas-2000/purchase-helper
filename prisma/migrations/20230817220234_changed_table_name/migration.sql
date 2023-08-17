/*
  Warnings:

  - You are about to drop the `reset_password` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "reset_password" DROP CONSTRAINT "reset_password_userId_fkey";

-- DropTable
DROP TABLE "reset_password";

-- CreateTable
CREATE TABLE "resetPassword" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "resetPassword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "resetPassword_token_key" ON "resetPassword"("token");

-- AddForeignKey
ALTER TABLE "resetPassword" ADD CONSTRAINT "resetPassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
