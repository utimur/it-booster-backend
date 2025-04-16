import { Injectable } from '@nestjs/common';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { InterviewRepository } from './interview.repository';

@Injectable()
export class InterviewService {
    constructor(private readonly interviewRepository: InterviewRepository) {}

    create(createInterviewDto: CreateInterviewDto) {
        return this.interviewRepository.create(createInterviewDto);
    }

    findAll() {
        return this.interviewRepository.findAll();
    }

    findOne(id: number) {
        return this.interviewRepository.findOne(id);
    }

    update(id: number, updateInterviewDto: UpdateInterviewDto) {
        return this.interviewRepository.update(id, updateInterviewDto);
    }

    remove(id: number) {
        return this.interviewRepository.remove(id);
    }
}
