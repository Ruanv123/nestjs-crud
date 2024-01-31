import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // para usar o class validator
    app.useGlobalPipes(new ValidationPipe());

    // global prefix
    app.setGlobalPrefix('/api');

    // config do swagger
    setupSwagger(app);

    await app.listen(3000);
}
bootstrap();
