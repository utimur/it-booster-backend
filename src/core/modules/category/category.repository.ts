import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaService';
import { Category, Prisma } from '@prisma/client';

@Injectable()
export class CategoryRepository {
    constructor(private prisma: PrismaService) {}

    create(createCategoryDto: Prisma.CategoryCreateInput): Promise<Category> {
        return this.prisma.category.create({
            data: {
                ...createCategoryDto,
            },
        });
    }

    findAll(): Promise<Category[]> {
        return this.prisma.category.findMany();
    }

    findOne(id: number): Promise<Category | null> {
        return this.prisma.category.findUnique({ where: { id: id } });
    }

    update(
        id: number,
        updateCategoryDto: Prisma.CategoryUpdateInput,
    ): Promise<Category> {
        return this.prisma.category.update({
            data: {
                ...updateCategoryDto,
            },
            where: { id: id },
        });
    }

    remove(id: number): Promise<Category> {
        return this.prisma.category.delete({ where: { id: id } });
    }
}
