import { Injectable } from '@nestjs/common';
import { AuthTgDto } from './dto/auth-tg.dto';

@Injectable()
export class TgAuthService {
    auth(createTgAuthDto: AuthTgDto) {
        return 'This action adds a new tgAuth';
    }
}
