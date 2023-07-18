import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './shared/interceptors/http-request.interceptor';
import { ResponseInterceptor } from './shared/interceptors/Response.interceptor';
import { GlobalExceptionHandler } from './shared/exceptions/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ResponseInterceptor(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionHandler());

  await app.listen(3000);
}
bootstrap();
