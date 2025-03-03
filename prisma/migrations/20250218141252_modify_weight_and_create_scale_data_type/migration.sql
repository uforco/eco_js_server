/*
  Warnings:

  - Added the required column `scale` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `weight` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "scale" TEXT NOT NULL,
DROP COLUMN "weight",
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;
