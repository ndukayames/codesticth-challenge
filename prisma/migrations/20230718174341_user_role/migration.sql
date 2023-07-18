-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('USER', 'STORE_OWNER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'USER';
