import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingMiddleware } from './logging/logging.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setDescription(
      "Ecommerce API developed in Henry's M4 Backend Web Full Stack course by Marcos Anselmo Portillo.\n\n" +
        '**Technologies Used**:\n\n' +
        '- [NestJS](https://nestjs.com/)\n' +
        '- [TypeScript](https://www.typescriptlang.org/)\n' +
        '- [TypeORM](https://typeorm.io/)\n' +
        '- [PostgreSQL](https://www.postgresql.org/)\n' +
        '- [Cloudinary](https://cloudinary.com/)\n' +
        '- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)\n' +
        '- [JWT](https://jwt.io/)\n' +
        '- [Swagger](https://swagger.io/)\n' +
        '- [Docker](https://www.docker.com/)\n\n' +
        '**Test Users**:\n\n' +
        '- Admin User\n' +
        '  - Username: admin@example.com\n' +
        '  - Password: aAbB123*\n' +
        '  - Identity: 758e68c7-40b2-4514-88f6-769c40b3d5a2\n\n' +
        '- Regular User\n' +
        '  - Username: user@example.com\n' +
        '  - Password: aAbB123*\n' +
        '  - Identity: cc067e19-ba78-483f-9c67-20f26af0c930\n\n' +
        '**API Routes**:\n\n' +
        '**Public Routes**:\n' +
        '- GET /\n' +
        '- GET /products\n' +
        '- GET /products/{id}\n' +
        '- POST /auth/signin\n' +
        '- POST /auth/signup\n\n' +
        '**Regular User Routes**:\n' +
        '- Public routes\n' +
        '- PUT /users/{id}\n' +
        '- GET /orders/\n' +
        '- GET /orders/{id}\n' +
        '- POST /orders\n\n' +
        '**Admin User Routes**:\n' +
        '- Regular User Routes\n' +
        '- GET /users\n' +
        '- GET /users/{id}\n' +
        '- DELETE /users/{id}\n' +
        '- POST /products\n' +
        '- GET /products/seeder\n' +
        '- PUT /products/{id}\n' +
        '- DELETE /products/{id}\n' +
        '- POST /categories/seeder\n' +
        '- POST /categories\n' +
        '- GET /categories\n' +
        '- GET /orders/all/admin\n' +
        '- POST /files/uploadImage/{productId}',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  app.use(new LoggingMiddleware().use);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();
