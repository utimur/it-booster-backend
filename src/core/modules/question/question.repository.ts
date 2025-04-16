import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaService';
import { Question, Prisma } from '@prisma/client';

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
