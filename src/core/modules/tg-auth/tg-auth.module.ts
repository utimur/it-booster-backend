import { Module } from '@nestjs/common';
import { TgAuthService } from './tg-auth.service';
import { TgAuthController } from './tg-auth.controller';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaService';

@Module({
    controllers: [TgAuthController],
    providers: [TgAuthService, PrismaService],
})
export class TgAuthModule {}
