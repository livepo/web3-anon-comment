/*
  Warnings:

  - Made the column `nonce` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `nonce` VARCHAR(191) NOT NULL;
