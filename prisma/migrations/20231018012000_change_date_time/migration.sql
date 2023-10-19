-- AlterTable
ALTER TABLE "bookings" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "trending" BOOLEAN;
