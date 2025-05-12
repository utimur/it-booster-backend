import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAuthPayload } from './types/user-auth-payload';

export const expiresIn = '7d';

@Injectable()
export class MyJwtService {
    constructor(private readonly jwtService: JwtService) {}

    async generate(payload: UserAuthPayload) {
        return this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn,
        });
    }

    async verify(token: string) {
        return this.jwtService.verifyAsync<UserAuthPayload>(token, {
            secret: process.env.JWT_SECRET,
        });
    }
}
