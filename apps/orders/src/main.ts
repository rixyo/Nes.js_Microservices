import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // this will remove any additional properties that are not in the input
      forbidNonWhitelisted: true, // this will throw an error if there are any additional properties that are not in the input
      transform: true, // this will transform the incoming data to the type of the input
    }),
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
