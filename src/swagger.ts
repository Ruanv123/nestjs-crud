import { INestApplication } from '@nestjs/common';
import {
    DocumentBuilder,
    SwaggerCustomOptions,
    SwaggerModule,
} from '@nestjs/swagger';

export const setupSwagger = async (app: INestApplication) => {
    const documentBuild = new DocumentBuilder()
        .setTitle('Recipes api')
        .setDescription('Recipes api description')
        .setVersion('0.1')
        .build();

    const document = SwaggerModule.createDocument(app, documentBuild, {
        deepScanRoutes: true,
    });

    const customOptions: SwaggerCustomOptions = {
        swaggerOptions: {
            persistAuthorization: true,
        },
    };

    SwaggerModule.setup('docs', app, document, {
        explorer: true,
        customSiteTitle: 'APIs Specification',
        ...customOptions,
    });
};
