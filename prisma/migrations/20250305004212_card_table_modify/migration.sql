/*
  Warnings:

  - Added the required column `price` to the `addToCart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addToCart" ADD COLUMN     "discount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
