import {
  BadRequestException,
  Logger,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-execption.filter';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './logger/logger.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingInterceptor } from './logger/logging-interceptor.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });
  const logger = new Logger('Bootstrap');
  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  // set versioning for all routes
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // set global pipe for all routes
  app.useGlobalPipes(
    new ValidationPipe({
      // request will be stripped if they are not in the DTO
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      // customize error response for validation errors
      exceptionFactory: (errors: ValidationError[] = []) => {
        const formatted: Record<string, string> = {};
        errors.forEach((err) => {
          if (err.constraints) {
            formatted[err.property] = Object.values(err.constraints)[0];
          }
        });
        return new BadRequestException({ ...formatted });
      },
    }),
  );

  // interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());

  // swagger config
  const swaggerConfig = new DocumentBuilder()
    .setTitle('JUDUL SWAGGER')
    .setDescription(
      'Two-Factor Authentication service for external applications',
    )
    .setVersion('1.0')
    .addApiKey(
      { type: 'apiKey', in: 'header', name: 'x-client-id' },
      'x-client-id',
    )
    .addApiKey(
      { type: 'apiKey', in: 'header', name: 'x-client-secret' },
      'x-client-secret',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  // set global filter for all routes
  app.useGlobalFilters(new HttpExceptionFilter());
  const PORT = process.env.PORT || 3000;

  await app.listen(PORT, () => {
    logger.log(`Server is running on port ${PORT}`);

    logger.log(`Swagger docs at http://localhost:${PORT}/api/docs`);
  });
}
bootstrap();
