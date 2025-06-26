import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('tread example')
    .setDescription('The tread API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'access-token', // name of the security scheme
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  document.paths = Object.fromEntries(
    Object.entries(document.paths).map(([path, ops]) => [
      path,
      Object.fromEntries(
        Object.entries(ops).map(([method, op]) => [
          method,
          {
            ...op,
            security: [{ 'access-token': [] }],
          },
        ]),
      ),
    ]),
  );

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
