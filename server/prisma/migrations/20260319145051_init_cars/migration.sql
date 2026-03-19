/*
  Warnings:

  - You are about to drop the `Car` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Car";

-- CreateTable
CREATE TABLE "cars" (
    "_id" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "totalPrice.display" TEXT NOT NULL,
    "totalPrice.raw" INTEGER NOT NULL,
    "basePrice.display" TEXT NOT NULL,
    "basePrice.raw" INTEGER NOT NULL,
    "mileage.display" TEXT NOT NULL,
    "mileage.raw" INTEGER NOT NULL,
    "transmission" TEXT NOT NULL,
    "engineSize" TEXT NOT NULL,
    "inspection" TEXT NOT NULL,
    "repairHistory" BOOLEAN NOT NULL,
    "warranty" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "colorCodes" TEXT NOT NULL,
    "mainImage" TEXT NOT NULL,
    "additionalImages" TEXT[],
    "shopName" TEXT NOT NULL,
    "shopLocation" TEXT NOT NULL,
    "detailUrl" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "parsedAt" TIMESTAMP(3) NOT NULL,
    "makeTranslated" TEXT NOT NULL,
    "colorTranslated" TEXT NOT NULL,
    "transmissionTranslated" TEXT NOT NULL,
    "inspectionTranslated" TEXT NOT NULL,
    "warrantyTranslated" TEXT NOT NULL,
    "repairHistoryTranslated" TEXT NOT NULL,
    "modelTranslated" TEXT NOT NULL,
    "shopNameTranslated" TEXT NOT NULL,
    "shopLocationTranslated" TEXT NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("_id")
);
