/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneNamber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNamber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "firstName" VARCHAR(30) NOT NULL,
ADD COLUMN     "lastName" VARCHAR(30) NOT NULL,
ADD COLUMN     "phoneNamber" TEXT NOT NULL,
ADD COLUMN     "profileImage" TEXT;

-- CreateTable
CREATE TABLE "userAddress" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "userAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userAddress_id_key" ON "userAddress"("id");

-- CreateIndex
CREATE UNIQUE INDEX "userAddress_userId_key" ON "userAddress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNamber_key" ON "User"("phoneNamber");

-- AddForeignKey
ALTER TABLE "userAddress" ADD CONSTRAINT "userAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
