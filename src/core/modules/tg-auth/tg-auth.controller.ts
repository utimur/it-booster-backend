import { Controller, Post, Body } from '@nestjs/common';
import { TgAuthService } from './tg-auth.service';
import { AuthTgDto } from './dto/auth-tg.dto';

@Controller('auth/tg')
export class TgAuthController {
    constructor(private readonly tgAuthService: TgAuthService) {}

    @Post()
    create(@Body() createTgAuthDto: AuthTgDto) {
        return this.tgAuthService.auth(createTgAuthDto);
    }
}
