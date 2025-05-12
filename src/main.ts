import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DelayInterceptor } from '@/dev/interceptors/delay.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    // TODO
    app.enableCors({
        origin: 'https://impatiently-uncommon-brambling.cloudpub.ru',
        credentials: true,
    });
    app.useGlobalInterceptors(new DelayInterceptor());
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
