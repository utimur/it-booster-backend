import { UserRole } from '@generated/client';
export class CreateUserDto {
    role: UserRole;
    firstName?: string;
    lastName?: string;
    username?: string;
    authDate: Date;
    photoUrl?: string;
    telegramId: number;
}
