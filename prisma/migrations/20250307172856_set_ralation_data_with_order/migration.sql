/*
  Warnings:

  - You are about to drop the column `order_details_id` on the `orderHistory` table. All the data in the column will be lost.
  - You are about to alter the column `total_price` on the `orderHistory` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - A unique constraint covering the columns `[order_id]` on the table `orderHistory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_id,order_id]` on the table `orderHistory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_id` to the `orderHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orderHistory" DROP CONSTRAINT "orderHistory_order_details_id_fkey";

-- DropIndex
DROP INDEX "orderHistory_order_details_id_key";

-- DropIndex
DROP INDEX "orderHistory_product_id_order_details_id_key";

-- AlterTable
ALTER TABLE "orderHistory" DROP COLUMN "order_details_id",
ADD COLUMN     "order_id" TEXT NOT NULL,
ALTER COLUMN "total_price" SET DATA TYPE DECIMAL(65,30);

-- CreateIndex
CREATE UNIQUE INDEX "orderHistory_order_id_key" ON "orderHistory"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "orderHistory_product_id_order_id_key" ON "orderHistory"("product_id", "order_id");

-- AddForeignKey
ALTER TABLE "orderHistory" ADD CONSTRAINT "orderHistory_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
