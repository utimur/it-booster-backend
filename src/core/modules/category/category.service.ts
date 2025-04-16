import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    create(createCategoryDto: CreateCategoryDto) {
        return this.categoryRepository.create(createCategoryDto);
    }

    findAll() {
        return this.categoryRepository.findAll();
    }

    findOne(id: number) {
        return this.categoryRepository.findOne(id);
    }

    update(id: number, updateCategoryDto: UpdateCategoryDto) {
        return this.categoryRepository.update(id, updateCategoryDto);
    }

    remove(id: number) {
        return this.categoryRepository.remove(id);
    }
}
