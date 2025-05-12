import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaService';
import { InterviewRepository } from './interview.repository';
import { TgAuthModule } from '@/core/modules/tg-auth/tg-auth.module';

@Module({
    imports: [TgAuthModule],
    controllers: [InterviewController],
    providers: [PrismaService, InterviewService, InterviewRepository],
})
export class InterviewModule {}
