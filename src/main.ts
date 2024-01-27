import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // para usar o class validator
    app.useGlobalPipes(new ValidationPipe());

    // global prefix
    app.setGlobalPrefix('/api');

    // config do swagger
    const config = new DocumentBuilder()
        .setTitle('Recipes api')
        .setDescription('Recipes api description')
        .setVersion('0.1')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(3000);
}
bootstrap();
