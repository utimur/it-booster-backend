import { Injectable } from '@nestjs/common';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { InterviewRepository } from './interview.repository';
import { connectById, connectByIds } from '@/shared/lib/prisma/connectById';

@Injectable()
export class InterviewService {
    constructor(private readonly interviewRepository: InterviewRepository) {}

    create({ categoryIds, authorId }: CreateInterviewDto) {
        return this.interviewRepository.create({
            author: connectById(authorId),
            categories: connectByIds(categoryIds),
        });
    }

    findAll() {
        return this.interviewRepository.findAll();
    }

    findOne(id: number) {
        return this.interviewRepository.findOne(id);
    }

    update(id: number, { completedAt, categoryIds }: UpdateInterviewDto) {
        return this.interviewRepository.update(id, {
            categories: connectByIds(categoryIds),
            completedAt,
        });
    }

    remove(id: number) {
        return this.interviewRepository.remove(id);
    }
}
