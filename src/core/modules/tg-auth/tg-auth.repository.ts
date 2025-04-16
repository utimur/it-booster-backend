import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaService';

@Injectable()
export class AnswerRepository {
    constructor(private prisma: PrismaService) {}
}
