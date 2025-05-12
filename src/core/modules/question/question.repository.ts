import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaService';
import { Question, Prisma, InterviewQuestion } from '@generated/client';

@Injectable()
export class QuestionRepository {
    constructor(private prisma: PrismaService) {}

    create(createQuestionDto: Prisma.QuestionCreateInput): Promise<Question> {
        return this.prisma.question.create({
            data: {
                ...createQuestionDto,
            },
        });
    }

    findAll(): Promise<Question[]> {
        return this.prisma.question.findMany();
    }

    findByInterviewId({
        interviewId,
    }: {
        interviewId: number;
    }): Promise<InterviewQuestion[]> {
        return this.prisma.interviewQuestion.findMany({
            where: {
                interview: {
                    id: interviewId,
                },
            },
            include: {
                question: true,
            },
        });
    }

    findOneByPosition({
        interviewId,
        position,
    }: {
        interviewId: number;
        position: number;
    }): Promise<InterviewQuestion | null> {
        return this.prisma.interviewQuestion.findFirst({
            where: {
                position,
                interview: {
                    id: interviewId,
                },
            },
            include: {
                question: {
                    include: {
                        answers: {
                            select: {
                                id: true,
                                text: true,
                                questionId: true,
                            },
                        },
                    },
                },
            },
        });
    }

    findOne(id: number): Promise<Question | null> {
        return this.prisma.question.findUnique({ where: { id: id } });
    }

    update(
        id: number,
        updateQuestionDto: Prisma.QuestionUpdateInput,
    ): Promise<Question> {
        return this.prisma.question.update({
            data: {
                ...updateQuestionDto,
            },
            where: { id: id },
        });
    }

    remove(id: number): Promise<Question> {
        return this.prisma.question.delete({ where: { id: id } });
    }
}
