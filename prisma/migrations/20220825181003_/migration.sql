/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `UserWallet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `UserWallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserWallet" ADD COLUMN     "address" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserWallet_username_key" ON "UserWallet"("username");
