-- AddForeignKey
ALTER TABLE "addToCart" ADD CONSTRAINT "addToCart_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
