/*
  Warnings:

  - You are about to alter the column `product_name` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "product_name" SET DATA TYPE VARCHAR(255);
