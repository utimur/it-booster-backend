import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, delay } from 'rxjs';

@Injectable()
export class DelayInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            delay(1000), // задержка 1000 мс = 1 секунда
        );
    }
}
