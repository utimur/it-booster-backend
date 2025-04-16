import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaSerivce';

@Injectable()
export class AnswerRepository {
    constructor(private prisma: PrismaService) {}

    create(createAnswerDto: CreateAnswerDto) {
        return this.prisma.answer.create({
            data: {
                ...createAnswerDto,
            },
        });
    }

    findAll() {
        return this.prisma.answer.findMany();
    }

    findOne(id: number) {
        return this.prisma.answer.findUnique({ where: { id: id } });
    }

    update(id: number, updateAnswerDto: UpdateAnswerDto) {
        return this.prisma.answer.update({
            data: {
                ...updateAnswerDto,
            },
            where: { id: id },
        });
    }

    remove(id: number) {
        return this.prisma.answer.delete({ where: { id: id } });
    }
}
