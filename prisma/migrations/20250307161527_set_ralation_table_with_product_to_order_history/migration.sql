/*
  Warnings:

  - A unique constraint covering the columns `[product_id,order_details_id]` on the table `orderHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "orderHistory_product_id_order_details_id_key" ON "orderHistory"("product_id", "order_details_id");

-- AddForeignKey
ALTER TABLE "orderHistory" ADD CONSTRAINT "orderHistory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
