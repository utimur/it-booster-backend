import { Module } from '@nestjs/common';
import { DirectionService } from './direction.service';
import { DirectionController } from './direction.controller';
import { DirectionRepository } from './direction.repository';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaSerivce';

@Module({
    controllers: [DirectionController],
    providers: [DirectionService, DirectionRepository, PrismaService],
})
export class DirectionModule {}
