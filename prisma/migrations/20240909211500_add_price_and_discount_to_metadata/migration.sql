/*
  Warnings:

  - Added the required column `discount` to the `metadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `metadata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "metadata" ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
