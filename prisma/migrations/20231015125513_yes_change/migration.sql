/*
  Warnings:

  - You are about to drop the column `slotId` on the `services` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_slotId_fkey";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "slotId";
