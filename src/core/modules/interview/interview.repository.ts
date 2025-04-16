import { Injectable } from '@nestjs/common';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaService';
import { Interview, Prisma } from '@prisma/client';

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

    findAll(): Promise<Interview[]> {
        return this.prisma.interview.findMany();
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
}
