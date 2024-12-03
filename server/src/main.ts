import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import winston from 'winston';
import { AppModule } from './app.module';
import { ExcludeFieldsInterceptor } from './interceptors/exlude.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.printf(({ level, message, timestamp }) => {
              return `${timestamp} [${level}] ${message}`;
            }),
          ),
        }),
      ],
    }),
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ExcludeFieldsInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
