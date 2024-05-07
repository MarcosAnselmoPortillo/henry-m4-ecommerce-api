import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingMiddleware } from './logging/logging.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setDescription("Ecommerce API developed in Henry's M4 Backend Web Full Stack course.")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  app.use(new LoggingMiddleware().use);
  app.useGlobalPipes(new ValidationPipe( { whitelist: true}));
  await app.listen(3000);
}
bootstrap();
