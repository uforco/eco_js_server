/*
  Warnings:

  - You are about to drop the column `orderId` on the `deliyveryAddress` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `orderHistory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[order_cid]` on the table `deliyveryAddress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_cid` to the `deliyveryAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_cid` to the `orderHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "deliyveryAddress" DROP CONSTRAINT "deliyveryAddress_orderId_fkey";

-- DropForeignKey
ALTER TABLE "orderHistory" DROP CONSTRAINT "orderHistory_order_id_fkey";

-- DropIndex
DROP INDEX "deliyveryAddress_orderId_key";

-- DropIndex
DROP INDEX "orderHistory_order_id_key";

-- AlterTable
ALTER TABLE "deliyveryAddress" DROP COLUMN "orderId",
ADD COLUMN     "order_cid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orderHistory" DROP COLUMN "order_id",
ADD COLUMN     "order_cid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "deliyveryAddress_order_cid_key" ON "deliyveryAddress"("order_cid");

-- AddForeignKey
ALTER TABLE "orderHistory" ADD CONSTRAINT "orderHistory_order_cid_fkey" FOREIGN KEY ("order_cid") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliyveryAddress" ADD CONSTRAINT "deliyveryAddress_order_cid_fkey" FOREIGN KEY ("order_cid") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
