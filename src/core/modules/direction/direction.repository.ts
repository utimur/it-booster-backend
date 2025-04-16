import { Injectable } from '@nestjs/common';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaSerivce';

@Injectable()
export class DirectionRepository {
    constructor(private prisma: PrismaService) {}

    create(createDirectionDto: CreateDirectionDto) {
        return this.prisma.direction.create({
            data: {
                ...createDirectionDto,
            },
        });
    }

    findAll() {
        return this.prisma.direction.findMany();
    }

    findOne(id: number) {
        return this.prisma.direction.findUnique({ where: { id: id } });
    }

    update(id: number, updateDirectionDto: UpdateDirectionDto) {
        return this.prisma.direction.update({
            data: {
                ...updateDirectionDto,
            },
            where: { id: id },
        });
    }

    remove(id: number) {
        return this.prisma.direction.delete({ where: { id: id } });
    }
}
