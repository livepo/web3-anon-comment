/*
  Warnings:

  - You are about to drop the column `wallet` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `wallet` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[walletAddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `walletAddress` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletAddress` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Session_wallet_idx` ON `Session`;

-- DropIndex
DROP INDEX `User_wallet_key` ON `User`;

-- AlterTable
ALTER TABLE `Session` DROP COLUMN `wallet`,
    ADD COLUMN `walletAddress` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `wallet`,
    ADD COLUMN `walletAddress` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Session_walletAddress_idx` ON `Session`(`walletAddress`);

-- CreateIndex
CREATE UNIQUE INDEX `User_walletAddress_key` ON `User`(`walletAddress`);
