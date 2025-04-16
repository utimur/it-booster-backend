import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AnswerRepository } from './answer.repository';

@Injectable()
export class AnswerService {
    constructor(private readonly answerRepository: AnswerRepository) {}

    create(createAnswerDto: CreateAnswerDto) {
        return this.answerRepository.create(createAnswerDto);
    }

    findAll() {
        return this.answerRepository.findAll();
    }

    findOne(id: number) {
        return this.answerRepository.findOne(id);
    }

    update(id: number, updateAnswerDto: UpdateAnswerDto) {
        return this.answerRepository.update(id, updateAnswerDto);
    }

    remove(id: number) {
        return this.answerRepository.remove(id);
    }
}
