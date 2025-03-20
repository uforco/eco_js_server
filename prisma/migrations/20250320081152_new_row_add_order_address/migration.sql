/*
  Warnings:

  - Added the required column `email` to the `deliyveryAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `deliyveryAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "order_status" SET DEFAULT 'Received';

-- AlterTable
ALTER TABLE "deliyveryAddress" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
