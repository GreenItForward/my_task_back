import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT') ||  Number.parseInt(process.env.npm_config_port) || 3000;
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));


  const packageJson = require('../package.json');
  app.enableCors();
  app.enableVersioning();
  const configSwagger = new DocumentBuilder()
    .setTitle(packageJson.name)
    .setDescription(packageJson.description)
    .setVersion(packageJson.version)
    .setContact(packageJson.author.name, packageJson.author.url, packageJson.author.email)
  packageJson.tags.forEach((tag: { name: string; description: string; }) => configSwagger.addTag(tag.name, tag.description));

  const document = SwaggerModule.createDocument(app, configSwagger.build())
  SwaggerModule.setup('api', app, document);
  await app.listen(port, () => {
    new Logger('NestApplication').log(`Server is running on : http://localhost:` + port);
  });
}
bootstrap();