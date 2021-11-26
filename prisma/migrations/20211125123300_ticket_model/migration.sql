/*
  Warnings:

  - You are about to drop the column `lotteryNumber` on the `lottery` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lotteryNumbers]` on the table `Lottery` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lotteryNumbers` to the `Lottery` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Lottery_lotteryNumber_key` ON `lottery`;

-- AlterTable
ALTER TABLE `lottery` DROP COLUMN `lotteryNumber`,
    ADD COLUMN `lotteryNumbers` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Ticket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ticketNumber` INTEGER NOT NULL,
    `userId` INTEGER NULL,

    UNIQUE INDEX `Ticket_ticketNumber_key`(`ticketNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Lottery_lotteryNumbers_key` ON `Lottery`(`lotteryNumbers`);

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
