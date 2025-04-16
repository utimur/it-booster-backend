import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaService';
import { Answer, Prisma } from '@prisma/client';

@Injectable()
export class AnswerRepository {
    constructor(private prisma: PrismaService) {}

    create(createAnswerDto: Prisma.AnswerCreateInput): Promise<Answer> {
        return this.prisma.answer.create({
            data: {
                ...createAnswerDto,
            },
        });
    }

    findAll(): Promise<Answer[]> {
        return this.prisma.answer.findMany();
    }

    findOne(id: number): Promise<Answer | null> {
        return this.prisma.answer.findUnique({ where: { id: id } });
    }

    update(
        id: number,
        updateAnswerDto: Prisma.AnswerUpdateInput,
    ): Promise<Answer> {
        return this.prisma.answer.update({
            data: {
                ...updateAnswerDto,
            },
            where: { id: id },
        });
    }

    remove(id: number): Promise<Answer> {
        return this.prisma.answer.delete({ where: { id: id } });
    }
}
