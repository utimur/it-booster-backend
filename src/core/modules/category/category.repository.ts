import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaSerivce';

@Injectable()
export class CategoryRepository {
    constructor(private prisma: PrismaService) {}

    create(createCategoryDto: CreateCategoryDto) {
        return this.prisma.category.create({
            data: {
                ...createCategoryDto,
            },
        });
    }

    findAll() {
        return this.prisma.category.findMany();
    }

    findOne(id: number) {
        return this.prisma.category.findUnique({ where: { id: id } });
    }

    update(id: number, updateCategoryDto: UpdateCategoryDto) {
        return this.prisma.category.update({
            data: {
                ...updateCategoryDto,
            },
            where: { id: id },
        });
    }

    remove(id: number) {
        return this.prisma.category.delete({ where: { id: id } });
    }
}
