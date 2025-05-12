import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaService';
import { User, Prisma } from '@generated/client';

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {}

    create(createUserDto: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data: {
                ...createUserDto,
            },
        });
    }

    findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    findOne(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id: id } });
    }

    async findByTelegramId(telegramId: number): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { telegramId },
        });

        return user;
    }

    update(
        id: number,
        {
            telegramId,
            role,
            firstName,
            lastName,
            authDate,
            photoUrl,
            username,
            lastVisitAt,
        }: Prisma.UserUpdateInput,
    ): Promise<User> {
        return this.prisma.user.update({
            data: {
                telegramId,
                role,
                firstName,
                lastName,
                authDate,
                photoUrl,
                username,
                lastVisitAt,
            },
            where: { id: id },
        });
    }

    remove(id: number): Promise<User> {
        return this.prisma.user.delete({ where: { id: id } });
    }
}
