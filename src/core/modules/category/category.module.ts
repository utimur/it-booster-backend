import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaSerivce';
import { CategoryRepository } from './category.repository';

@Module({
    controllers: [CategoryController],
    providers: [PrismaService, CategoryService, CategoryRepository],
})
export class CategoryModule {}
