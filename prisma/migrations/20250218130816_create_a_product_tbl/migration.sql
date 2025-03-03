-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "product_bercode" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "image" JSONB NOT NULL,
    "rating" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" INTEGER NOT NULL,
    "brand_name" TEXT,
    "short_Description" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quality_Description" JSONB NOT NULL,
    "weight" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "stock_Status" INTEGER NOT NULL,
    "tag" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_product_id_key" ON "Product"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_product_bercode_key" ON "Product"("product_bercode");
