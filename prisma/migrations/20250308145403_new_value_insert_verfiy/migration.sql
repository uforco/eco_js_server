/*
  Warnings:

  - A unique constraint covering the columns `[userId,id]` on the table `userAddress` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "verify" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "phoneNumber" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "userAddress_userId_id_key" ON "userAddress"("userId", "id");
