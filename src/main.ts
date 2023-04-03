import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const packageJson = require('../package.json');
  app.enableCors();
  app.enableVersioning();
  const config = new DocumentBuilder()
    .setTitle(packageJson.name)
    .setDescription(packageJson.description)
    .setVersion(packageJson.version)
    .setContact(packageJson.author.name, packageJson.author.url, packageJson.author.email)

  packageJson.tags.forEach(tag => {
    config.addTag(tag.name, tag.description);
  });

  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.npm_config_port || 3000);
}
bootstrap();
