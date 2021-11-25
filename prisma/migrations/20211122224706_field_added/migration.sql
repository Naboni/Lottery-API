/*
  Warnings:

  - You are about to alter the column `age` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum("user_age")` to `Int`.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `gender` ENUM('Male', 'Female') NOT NULL,
    MODIFY `age` INTEGER NOT NULL;
