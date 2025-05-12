import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AnswerRepository } from './answer.repository';
import { connectById } from '@/shared/lib/prisma/connectById';

@Injectable()
export class AnswerService {
    constructor(private readonly answerRepository: AnswerRepository) {}

    create({ isCorrect, text, questionId }: CreateAnswerDto) {
        return this.answerRepository.create({
            text,
            isCorrect,
            question: connectById(questionId),
        });
    }

    findAll() {
        return this.answerRepository.findAll();
    }

    findOne(id: number) {
        return this.answerRepository.findOne(id);
    }

    update(id: number, { isCorrect, text }: UpdateAnswerDto) {
        return this.answerRepository.update(id, {
            isCorrect,
            text,
            updatedAt: new Date(),
        });
    }

    remove(id: number) {
        return this.answerRepository.remove(id);
    }
}
