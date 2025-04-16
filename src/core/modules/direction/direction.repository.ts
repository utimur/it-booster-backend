import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaService';
import { Direction, Prisma } from '@prisma/client';

@Injectable()
export class DirectionRepository {
    constructor(private prisma: PrismaService) {}

    create(
        createDirectionDto: Prisma.DirectionCreateInput,
    ): Promise<Direction> {
        return this.prisma.direction.create({
            data: {
                ...createDirectionDto,
            },
        });
    }

    findAll(): Promise<Direction[]> {
        return this.prisma.direction.findMany();
    }

    findOne(id: number): Promise<Direction | null> {
        return this.prisma.direction.findUnique({ where: { id: id } });
    }

    update(
        id: number,
        updateDirectionDto: Prisma.DirectionUpdateInput,
    ): Promise<Direction> {
        return this.prisma.direction.update({
            data: {
                ...updateDirectionDto,
            },
            where: { id: id },
        });
    }

    remove(id: number): Promise<Direction> {
        return this.prisma.direction.delete({ where: { id: id } });
    }
}
