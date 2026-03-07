// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors();
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // allow React frontend to access API
  app.enableCors();

  // enable DTO validation
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();