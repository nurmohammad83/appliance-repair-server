/*
  Warnings:

  - You are about to drop the `Details` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Details" DROP CONSTRAINT "Details_serviceId_fkey";

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "description" TEXT[];

-- DropTable
DROP TABLE "Details";
