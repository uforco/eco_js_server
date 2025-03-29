/*
  Warnings:

  - Added the required column `provider` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_phoneNumber_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" TEXT NOT NULL,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "profileImage" SET DEFAULT 'https://github.com/shadcn.png';
