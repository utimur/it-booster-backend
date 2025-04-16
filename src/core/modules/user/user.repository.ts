import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/configuration/db/PrismaService/PrismaService';
import { User, Prisma } from '@prisma/client';

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

    update(id: number, updateUserDto: Prisma.UserUpdateInput): Promise<User> {
        return this.prisma.user.update({
            data: {
                ...updateUserDto,
            },
            where: { id: id },
        });
    }

    remove(id: number): Promise<User> {
        return this.prisma.user.delete({ where: { id: id } });
    }
}
