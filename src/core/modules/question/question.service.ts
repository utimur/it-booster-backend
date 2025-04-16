import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionService {
    constructor(private readonly questionRepository: QuestionRepository) {}

    create(createQuestionDto: CreateQuestionDto) {
        return this.questionRepository.create(createQuestionDto);
    }

    findAll() {
        return this.questionRepository.findAll();
    }

    findOne(id: number) {
        return this.questionRepository.findOne(id);
    }

    update(id: number, updateQuestionDto: UpdateQuestionDto) {
        return this.questionRepository.update(id, updateQuestionDto);
    }

    remove(id: number) {
        return this.questionRepository.remove(id);
    }
}
