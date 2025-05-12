import { UserAuthPayload } from '@/core/modules/tg-auth/types/user-auth-payload';

declare global {
    namespace Express {
        interface Request {
            user?: UserAuthPayload;
        }
    }
}
