import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';
import * as packageJson from '../package.json';

/**
 * Входной метод приложения
 */
async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    console.log('process.env :>> ', process.env);

    const config = new DocumentBuilder()
        .setTitle('dmc.core')
        .setDescription('Документация BACKEND REST API')
        .setVersion(packageJson.version)
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
start();
