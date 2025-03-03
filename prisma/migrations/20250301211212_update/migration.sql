/*
  Warnings:

  - You are about to drop the column `product_bercode` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `quality_Description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bercode]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `qty` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_product_bercode_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "product_bercode",
DROP COLUMN "quality_Description",
DROP COLUMN "weight",
ADD COLUMN     "bercode" TEXT,
ADD COLUMN     "brand_logo" TEXT,
ADD COLUMN     "qty" TEXT NOT NULL,
ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "rating" SET DEFAULT 1,
ALTER COLUMN "price" SET DATA TYPE TEXT,
ALTER COLUMN "discount" SET DEFAULT '0',
ALTER COLUMN "discount" SET DATA TYPE TEXT,
ALTER COLUMN "tag" DROP NOT NULL,
ALTER COLUMN "tag" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Product_bercode_key" ON "Product"("bercode");
