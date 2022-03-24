/* istanbul ignore file */
/* eslint-disable object-curly-newline */
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { description, name, version } from '../package.json';
import createApp from './app';
import { INestApplication } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const DEFAULT_PORT = parseInt(process.env.PORT || '9090', 10);
  const app: INestApplication = await createApp();
  const options = new DocumentBuilder()
    .addServer(`http://${name}.{environment}.learnapp.co`, 'Remote Server', {
      environment: { default: 'dev', enum: ['dev', 'stage', 'prod'] },
    })
    .addServer(`http://localhost:${DEFAULT_PORT}`, 'Local Server')
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .addApiKey({ type: 'apiKey', in: 'header', name: 'x-api-key' }, 'x-api-key')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);
  await app.init();
  await app.listen(DEFAULT_PORT);
  console.log(
    `API documentation server started on http://localhost:${DEFAULT_PORT}/api`,
  );
}

/* istanbul ignore next */
// eslint-disable-next-line no-console
bootstrap().catch((err) => console.log((err as Error).message));
