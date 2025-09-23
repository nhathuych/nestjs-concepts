import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'debug', 'error', 'verbose'],
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3001);

  // Middleware runs first, then Pipes handle DTO validation before controller logic.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,  // Remove fields that are not defined in the DTO
      forbidNonWhitelisted: true, // Throw 400(Bad Request) if request contains unknown fields
      transform: true,  // Automatically transform payloads to DTO types (e.g., "123" -> 123, "true" -> true)
    })
  );

  app.setGlobalPrefix('api'); // common API prefix
  app.enableVersioning({
    type: VersioningType.URI, // use URI versioning: /api/v1, /api/v2
    defaultVersion: '1',      // if version is not specified, default to v1
  });

  // Enable automatic serialization rules (e.g., @Exclude()) for all responses
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  await app.listen(port);
}
bootstrap();
