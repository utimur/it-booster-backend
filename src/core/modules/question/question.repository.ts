import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaSerivce';

@Injectable()
export class QuestionRepository {
    constructor(private prisma: PrismaService) {}

    create(createQuestionDto: CreateQuestionDto) {
        return this.prisma.question.create({
            data: {
                ...createQuestionDto,
            },
        });
    }

    findAll() {
        return this.prisma.question.findMany();
    }

    findOne(id: number) {
        return this.prisma.question.findUnique({ where: { id: id } });
    }

    update(id: number, updateQuestionDto: UpdateQuestionDto) {
        return this.prisma.question.update({
            data: {
                ...updateQuestionDto,
            },
            where: { id: id },
        });
    }

    remove(id: number) {
        return this.prisma.question.delete({ where: { id: id } });
    }
}
