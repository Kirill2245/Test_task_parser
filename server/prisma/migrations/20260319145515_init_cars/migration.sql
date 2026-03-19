/*
  Warnings:

  - You are about to drop the column `basePrice.display` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `basePrice.raw` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `mileage.display` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `mileage.raw` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice.display` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice.raw` on the `cars` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[detailUrl]` on the table `cars` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "cars" DROP COLUMN "basePrice.display",
DROP COLUMN "basePrice.raw",
DROP COLUMN "mileage.display",
DROP COLUMN "mileage.raw",
DROP COLUMN "totalPrice.display",
DROP COLUMN "totalPrice.raw",
ADD COLUMN     "basePriceDisplay" TEXT,
ADD COLUMN     "basePriceRaw" INTEGER,
ADD COLUMN     "mileageDisplay" TEXT,
ADD COLUMN     "mileageRaw" INTEGER,
ADD COLUMN     "totalPriceDisplay" TEXT,
ADD COLUMN     "totalPriceRaw" INTEGER,
ALTER COLUMN "make" DROP NOT NULL,
ALTER COLUMN "model" DROP NOT NULL,
ALTER COLUMN "year" DROP NOT NULL,
ALTER COLUMN "transmission" DROP NOT NULL,
ALTER COLUMN "engineSize" DROP NOT NULL,
ALTER COLUMN "inspection" DROP NOT NULL,
ALTER COLUMN "repairHistory" DROP NOT NULL,
ALTER COLUMN "warranty" DROP NOT NULL,
ALTER COLUMN "color" DROP NOT NULL,
ALTER COLUMN "colorCodes" DROP NOT NULL,
ALTER COLUMN "mainImage" DROP NOT NULL,
ALTER COLUMN "shopName" DROP NOT NULL,
ALTER COLUMN "shopLocation" DROP NOT NULL,
ALTER COLUMN "detailUrl" DROP NOT NULL,
ALTER COLUMN "page" DROP NOT NULL,
ALTER COLUMN "parsedAt" DROP NOT NULL,
ALTER COLUMN "makeTranslated" DROP NOT NULL,
ALTER COLUMN "colorTranslated" DROP NOT NULL,
ALTER COLUMN "transmissionTranslated" DROP NOT NULL,
ALTER COLUMN "inspectionTranslated" DROP NOT NULL,
ALTER COLUMN "warrantyTranslated" DROP NOT NULL,
ALTER COLUMN "repairHistoryTranslated" DROP NOT NULL,
ALTER COLUMN "modelTranslated" DROP NOT NULL,
ALTER COLUMN "shopNameTranslated" DROP NOT NULL,
ALTER COLUMN "shopLocationTranslated" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cars_detailUrl_key" ON "cars"("detailUrl");
