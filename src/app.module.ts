import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './configuration/db/PrismaService/PrismaSerivce';
import { DirectionModule } from '@/core/modules/direction/direction.module';

@Module({
    imports: [ConfigModule.forRoot(), DirectionModule],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
