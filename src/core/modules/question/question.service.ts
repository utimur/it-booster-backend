import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionRepository } from './question.repository';
import { connectById } from '@/shared/lib/prisma/connectById';

@Injectable()
export class QuestionService {
    constructor(private readonly questionRepository: QuestionRepository) {}

    create({ directionId, text, type, categoryId }: CreateQuestionDto) {
        return this.questionRepository.create({
            category: connectById(categoryId),
            direction: connectById(directionId),
            text,
            type,
        });
    }

    findAll() {
        return this.questionRepository.findAll();
    }

    findOne(id: number) {
        return this.questionRepository.findOne(id);
    }

    update(
        id: number,
        { categoryId, type, text, directionId }: UpdateQuestionDto,
    ) {
        return this.questionRepository.update(id, {
            category: connectById(categoryId),
            direction: connectById(directionId),
            text,
            type,
            updatedAt: new Date(),
        });
    }

    remove(id: number) {
        return this.questionRepository.remove(id);
    }
}
