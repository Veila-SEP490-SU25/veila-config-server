process.env.TZ = 'Asia/Ho_Chi_Minh'; // Set timezone to Vietnam
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@/common/filters';
import { HttpStatusInterceptor } from '@/common/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.enableCors({
    origin: (process.env.FE_URL as string) || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'DNT',
      'User-Agent',
      'X-Requested-With',
      'If-Modified-Since',
      'Cache-Control',
      'Content-Type',
      'Range',
      'Authorization',
      'X-Secret-Key',
    ],
    exposedHeaders: ['Content-Length', 'Content-Range', 'Content-Type'],
    maxAge: 86400,
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new HttpStatusInterceptor());

  const documentConfig = new DocumentBuilder()
    .setTitle('Veila Configuration Server API')
    .setDescription('API documentation for Veila Configuration Server')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('/swagger', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  const host = process.env.LISTEN_HOST || '0.0.0.0';
  const port = process.env.LISTEN_PORT || 3000;

  await app.listen(port, host).then(() => {
    Logger.log(`Server running on http://${host}:${port}`, 'Bootstrap');
    Logger.log(
      `Swagger running on http://${host}:${port}/swagger`,
      'Bootstrap',
    );
  });
}
bootstrap();
