/*
  Warnings:

  - You are about to drop the `deliyveryaddress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "deliyveryaddress" DROP CONSTRAINT "deliyveryaddress_orderId_fkey";

-- DropTable
DROP TABLE "deliyveryaddress";

-- CreateTable
CREATE TABLE "deliyveryAddress" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "deliyveryAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "deliyveryAddress_id_key" ON "deliyveryAddress"("id");

-- CreateIndex
CREATE UNIQUE INDEX "deliyveryAddress_orderId_key" ON "deliyveryAddress"("orderId");

-- AddForeignKey
ALTER TABLE "orderHistory" ADD CONSTRAINT "orderHistory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliyveryAddress" ADD CONSTRAINT "deliyveryAddress_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
