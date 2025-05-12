import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserAuthPayload } from '@/core/modules/tg-auth/types/user-auth-payload';

type UserProperty = keyof UserAuthPayload;

export const UserAuthData = createParamDecorator<
    UserProperty | undefined,
    UserAuthPayload[UserProperty] | UserAuthPayload
>((data: UserProperty | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user!;

    return data ? user[data] : user;
});
