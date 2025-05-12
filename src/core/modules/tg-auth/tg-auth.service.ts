import { Injectable } from '@nestjs/common';
import { AuthTgDto } from './dto/auth-tg.dto';
import { UserRepository } from '@/core/modules/user/user.repository';
import { UserAuthPayload } from './types/user-auth-payload';
import { MyJwtService } from './my-jwt.service';

@Injectable()
export class TgAuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: MyJwtService,
    ) {}

    async login({ hash, ...createTgAuthDto }: AuthTgDto) {
        try {
            let user = await this.userRepository.findByTelegramId(
                createTgAuthDto.telegramId,
            );
            if (!user) {
                user = await this.userRepository.create(createTgAuthDto);
            } else {
                user = await this.userRepository.update(user.id, {
                    ...createTgAuthDto,
                    lastVisitAt: new Date(),
                });
            }

            return {
                accessToken: await this.jwtService.generate({
                    userId: user.id,
                    username: user.username ?? '',
                    telegramId: user.telegramId,
                }),
            };
        } catch (e) {
            console.log(e);
            return {
                accessToken: null,
            };
        }
    }

    async getProfile(payload: UserAuthPayload) {
        const user = await this.userRepository.findByTelegramId(
            payload.telegramId,
        );

        return user;
    }
}
