-- DropForeignKey
ALTER TABLE "addToCart" DROP CONSTRAINT "addToCart_userId_fkey";

-- AlterTable
ALTER TABLE "addToCart" ALTER COLUMN "userId" SET DATA TYPE TEXT;
