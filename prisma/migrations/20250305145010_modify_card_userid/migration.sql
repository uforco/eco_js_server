/*
  Warnings:

  - You are about to drop the column `user_id` on the `addToCart` table. All the data in the column will be lost.
  - Added the required column `userId` to the `addToCart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addToCart" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL;
