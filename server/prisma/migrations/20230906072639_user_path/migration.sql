/*
  Warnings:

  - You are about to drop the column `path` on the `Folder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[path]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `path` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "path";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "path" TEXT NOT NULL,
ADD COLUMN     "provider" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_path_key" ON "User"("path");
