import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { LogFilter } from './shared/filter/log/log.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  const config = new DocumentBuilder().setTitle('nest app').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/documentation', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,

      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new LogFilter());

  await app.listen(3000);
}
bootstrap();
