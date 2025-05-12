import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './configuration/db/PrismaService/PrismaService';
import { DirectionModule } from '@/core/modules/direction/direction.module';
import { UserModule } from '@/core/modules/user/user.module';
import { QuestionModule } from '@/core/modules/question/question.module';
import { InterviewModule } from '@/core/modules/interview/interview.module';
import { CategoryModule } from '@/core/modules/category/category.module';
import { AnswerModule } from '@/core/modules/answer/answer.module';
import { TgAuthModule } from '@/core/modules/tg-auth/tg-auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        DirectionModule,
        UserModule,
        QuestionModule,
        InterviewModule,
        CategoryModule,
        AnswerModule,
        TgAuthModule,
    ],
    controllers: [],
    providers: [PrismaService],
})
export class AppModule {}
