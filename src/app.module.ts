import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './configuration/db/PrismaService/PrismaSerivce';
import { DirectionModule } from '@/core/modules/direction/direction.module';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { InterviewModule } from './interview/interview.module';
import { CategoryModule } from './category/category.module';
import { AnswerModule } from './answer/answer.module';

@Module({
    imports: [ConfigModule.forRoot(), DirectionModule, UserModule, QuestionModule, InterviewModule, CategoryModule, AnswerModule],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
