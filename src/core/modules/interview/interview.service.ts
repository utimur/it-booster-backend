import { Injectable } from '@nestjs/common';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { InterviewRepository } from './interview.repository';
import { connectById, connectByIds } from '@/shared/lib/prisma/connectById';
import { RepeatInterviewDto } from '@/core/modules/interview/dto/repeat-interview.dto';

@Injectable()
export class InterviewService {
    constructor(private readonly interviewRepository: InterviewRepository) {}

    create({ categoryIds, authorId, directionId }: CreateInterviewDto) {
        return this.interviewRepository.create({
            author: connectById(authorId),
            categories: connectByIds(categoryIds),
            direction: connectById(directionId),
        });
    }

    findAll({ authorId }: { authorId: number }) {
        return this.interviewRepository.findAll({ authorId });
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

    repeat(repeatInterviewDto: RepeatInterviewDto) {
        return this.interviewRepository.repeat(repeatInterviewDto.interviewId);
    }
}
