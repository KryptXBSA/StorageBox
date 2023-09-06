/*
  Warnings:

  - You are about to drop the column `path` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_path_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "path";
