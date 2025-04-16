import { Injectable } from '@nestjs/common';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaSerivce';

@Injectable()
export class InterviewRepository {
    constructor(private prisma: PrismaService) {}

    create(createInterviewDto: CreateInterviewDto) {
        return this.prisma.interview.create({
            data: {
                ...createInterviewDto,
            },
        });
    }

    findAll() {
        return this.prisma.interview.findMany();
    }

    findOne(id: number) {
        return this.prisma.interview.findUnique({ where: { id: id } });
    }

    update(id: number, updateInterviewDto: UpdateInterviewDto) {
        return this.prisma.interview.update({
            data: {
                ...updateInterviewDto,
            },
            where: { id: id },
        });
    }

    remove(id: number) {
        return this.prisma.interview.delete({ where: { id: id } });
    }
}
