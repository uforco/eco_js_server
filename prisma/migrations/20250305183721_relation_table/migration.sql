/*
  Warnings:

  - Changed the type of `userId` on the `addToCart` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "addToCart" ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "addToCart_userId_product_id_key" ON "addToCart"("userId", "product_id");

-- AddForeignKey
ALTER TABLE "addToCart" ADD CONSTRAINT "addToCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
