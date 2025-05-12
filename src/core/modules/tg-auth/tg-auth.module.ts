import { Module } from '@nestjs/common';
import { TgAuthService } from './tg-auth.service';
import { TgAuthController } from './tg-auth.controller';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaService';
import { UserRepository } from '@/core/modules/user/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { expiresIn, MyJwtService } from './my-jwt.service';

@Module({
    controllers: [TgAuthController],
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn },
        }),
    ],
    exports: [TgAuthService, MyJwtService],
    providers: [TgAuthService, PrismaService, UserRepository, MyJwtService],
})
export class TgAuthModule {}
