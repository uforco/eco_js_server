-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_user_id_fkey";

-- DropIndex
DROP INDEX "Order_user_id_key";
