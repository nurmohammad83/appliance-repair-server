/*
  Warnings:

  - You are about to drop the column `location` on the `services` table. All the data in the column will be lost.
  - Added the required column `image` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "services" DROP COLUMN "location",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "subTitle" TEXT[];
