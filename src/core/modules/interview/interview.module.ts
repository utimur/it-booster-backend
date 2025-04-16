import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaSerivce';
import { InterviewRepository } from './interview.repository';

@Module({
    controllers: [InterviewController],
    providers: [PrismaService, InterviewService, InterviewRepository],
})
export class InterviewModule {}
