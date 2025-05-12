/*
  Warnings:

  - Added the required column `questionId` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Interview_directionId_key";

-- DropIndex
DROP INDEX "Question_categoryId_key";

-- DropIndex
DROP INDEX "Question_directionId_key";

-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "questionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
