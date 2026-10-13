import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';
// import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));


  // // Получаем ConfigService
  const configService = app.get(ConfigService);

  const corsOrigins = configService.get<string>('FRONT_URL');
  const originsList = corsOrigins ? corsOrigins.split(',') : '*';

  app.enableCors({
      origin: originsList,
      methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
      credentials: true, // разрешить передачу куки и авторизационных заголовков
      allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // const logger = new Logger('back-nestjs.main');  
  // // Выводим все конфигурации в консоль
  // // Обратите внимание: приватное свойство 'cache' содержит все загруженные переменные
  // logger.log('Loaded Configuration:');
  // console.dir(configService['cache'], { depth: null, colors: true });
  
  await app.listen(process.env.BACK_PORT || 3000);
}

bootstrap();
