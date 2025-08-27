import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

  await app.listen(port);
}
bootstrap();
