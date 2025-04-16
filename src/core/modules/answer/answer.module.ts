import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaSerivce';
import { AnswerRepository } from './answer.repository';

@Module({
    controllers: [AnswerController],
    providers: [PrismaService, AnswerService, AnswerRepository],
})
export class AnswerModule {}
