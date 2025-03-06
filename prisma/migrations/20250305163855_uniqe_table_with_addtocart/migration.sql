/*
  Warnings:

  - A unique constraint covering the columns `[userId,product_id]` on the table `addToCart` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "addToCart" ALTER COLUMN "cart_id" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "addToCart_userId_product_id_key" ON "addToCart"("userId", "product_id");
