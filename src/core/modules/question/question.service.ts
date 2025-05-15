import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionRepository } from './question.repository';
import { connectById } from '@/shared/lib/prisma/connectById';
import { InterviewQuestion } from '@generated/index';

@Injectable()
export class QuestionService {
    constructor(private readonly questionRepository: QuestionRepository) {}

    create({ directionId, text, type, categoryId, title }: CreateQuestionDto) {
        return this.questionRepository.create({
            category: connectById(categoryId),
            direction: connectById(directionId),
            text,
            type,
            title,
        });
    }

    findAll() {
        return this.questionRepository.findAll();
    }

    findByInterviewId({ interviewId }: { interviewId: number }) {
        return this.questionRepository.findByInterviewId({ interviewId });
    }

    findAllByDirection({ directionId }: { directionId: number }) {
        return this.questionRepository.findAllByDirection({ directionId });
    }

    findOneByPosition({
        interviewId,
        position,
    }: {
        interviewId: number;
        position: number;
    }): Promise<InterviewQuestion | null> {
        return this.questionRepository.findOneByPosition({
            interviewId,
            position,
        });
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
