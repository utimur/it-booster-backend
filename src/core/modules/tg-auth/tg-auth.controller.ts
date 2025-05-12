import {
    Controller,
    Post,
    Body,
    Get,
    Req,
    UseGuards,
    HttpException,
    HttpStatus,
    Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TgAuthService } from './tg-auth.service';
import { AuthTgDto } from './dto/auth-tg.dto';
import { TgAuthGuard } from './tg-auth.guard';

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    // TODO
    // sameSite: 'strict',
} as const;

@Controller('auth/tg')
export class TgAuthController {
    constructor(private readonly tgAuthService: TgAuthService) {}

    @Post('login')
    async auth(
        @Req() req: Request,
        @Res() res: Response,
        @Body() createTgAuthDto: AuthTgDto,
    ) {
        const data = await this.tgAuthService.login(createTgAuthDto);
        if (!data.accessToken) {
            return res.status(401);
        }
        res.cookie('authorization', `Bearer ${data.accessToken}`, {
            ...cookieOptions,
            // 7 дней
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: 'Login successfully',
        });
    }

    @UseGuards(TgAuthGuard)
    @Get()
    getProfile(@Req() request: Request) {
        const userData = request.user;
        if (!userData) {
            throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
        }
        return this.tgAuthService.getProfile(userData);
    }

    @Get('logout')
    logout(@Res() res: Response) {
        res.clearCookie('authorization', cookieOptions);

        return res.status(200).json({
            message: 'Logout successfully',
        });
    }
}
