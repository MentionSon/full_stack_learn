import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  // app.useStaticAssets('uploads', {
  //   prefix: '/uploads',
  // });

  const options = new DocumentBuilder()
    .setTitle('full stack')
    .setDescription('The full stack server api')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.SERVER_PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
