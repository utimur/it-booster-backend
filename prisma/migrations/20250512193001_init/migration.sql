-- DropIndex
DROP INDEX "InterviewQuestionAnswer_answerId_key";

-- DropIndex
DROP INDEX "InterviewQuestionAnswer_interviewQuestionId_key";

-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "correctValue" TEXT,
ALTER COLUMN "isCorrect" DROP NOT NULL;
