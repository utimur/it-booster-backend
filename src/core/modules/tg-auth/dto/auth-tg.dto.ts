export class AuthTgDto {
    id: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    authDate: Date;
    photo_url?: string;
    hash: string;
}
