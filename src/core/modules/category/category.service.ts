import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    create({ title }: CreateCategoryDto) {
        return this.categoryRepository.create({ title });
    }

    findAll() {
        return this.categoryRepository.findAll();
    }

    findOne(id: number) {
        return this.categoryRepository.findOne(id);
    }

    update(id: number, { title }: UpdateCategoryDto) {
        return this.categoryRepository.update(id, {
            title,
            updatedAt: new Date(),
        });
    }

    remove(id: number) {
        return this.categoryRepository.remove(id);
    }
}
