import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaService';
import { Interview, Prisma } from '@generated/client';

@Injectable()
export class InterviewRepository {
    constructor(private prisma: PrismaService) {}

    create(
        createInterviewDto: Prisma.InterviewCreateInput,
    ): Promise<Interview> {
        return this.prisma.interview.create({
            data: {
                ...createInterviewDto,
            },
        });
    }

    findAll({ authorId }: { authorId: number }): Promise<Interview[]> {
        return this.prisma.interview.findMany({
            where: {
                authorId,
            },
            include: {
                _count: true,
                interviewQuestions: {
                    include: {
                        question: {
                            include: {
                                _count: true,
                            },
                        },
                    },
                },
                direction: true,
                categories: true,
            },
        });
    }

    findOne(id: number): Promise<Interview | null> {
        return this.prisma.interview.findUnique({ where: { id: id } });
    }

    update(
        id: number,
        updateInterviewDto: Prisma.InterviewUpdateInput,
    ): Promise<Interview> {
        return this.prisma.interview.update({
            data: {
                ...updateInterviewDto,
            },
            where: { id: id },
        });
    }

    remove(id: number): Promise<Interview> {
        return this.prisma.interview.delete({ where: { id: id } });
    }

    async repeat(interviewId: number) {
        await this.prisma.interviewQuestionAnswer.deleteMany({
            where: {
                interviewQuestion: {
                    interviewId,
                },
            },
        });

        await this.prisma.interviewQuestion.updateManyAndReturn({
            data: {
                completedAt: null,
            },
            where: {
                interview: {
                    id: interviewId,
                },
            },
        });
    }
}
