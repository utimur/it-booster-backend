import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaSerivce';

@Module({
    controllers: [UserController],
    providers: [PrismaService, UserService, UserRepository],
})
export class UserModule {}
