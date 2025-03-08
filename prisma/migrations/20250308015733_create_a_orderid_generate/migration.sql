-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "order_progress" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "order_status" TEXT NOT NULL DEFAULT 'pending';
