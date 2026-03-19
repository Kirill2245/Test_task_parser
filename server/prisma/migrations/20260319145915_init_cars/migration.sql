/*
  Warnings:

  - The primary key for the `cars` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `cars` table. All the data in the column will be lost.
  - The `additionalImages` column on the `cars` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `id` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Made the column `make` on table `cars` required. This step will fail if there are existing NULL values in that column.
  - Made the column `model` on table `cars` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year` on table `cars` required. This step will fail if there are existing NULL values in that column.
  - Made the column `parsedAt` on table `cars` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalPriceDisplay` on table `cars` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalPriceRaw` on table `cars` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "cars" DROP CONSTRAINT "cars_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "make" SET NOT NULL,
ALTER COLUMN "model" SET NOT NULL,
ALTER COLUMN "year" SET NOT NULL,
DROP COLUMN "additionalImages",
ADD COLUMN     "additionalImages" JSONB,
ALTER COLUMN "parsedAt" SET NOT NULL,
ALTER COLUMN "totalPriceDisplay" SET NOT NULL,
ALTER COLUMN "totalPriceRaw" SET NOT NULL,
ADD CONSTRAINT "cars_pkey" PRIMARY KEY ("id");
