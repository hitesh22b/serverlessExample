import {
  BadRequestException,
  INestApplication,
  NestApplicationOptions,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded } from 'express';
import timeout from 'connect-timeout';
import { json } from 'body-parser';
import helmet from 'helmet';

const ERROR_EXIT_CODE = 1;

/* istanbul ignore next */
process
  .on('unhandledRejection', (reason) => {
    // eslint-disable-next-line no-console
    console.error(reason);
    process.exit(ERROR_EXIT_CODE);
  })
  .on('uncaughtException', (err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(ERROR_EXIT_CODE);
  });

export default async function createApp(): Promise<INestApplication> {
  const expressServer = express();
  const httpAdapter = new ExpressAdapter(expressServer);

  const options: NestApplicationOptions = { logger: false };
  const app: INestApplication = await NestFactory.create(
    AppModule,
    httpAdapter,
    options,
  );

  const bodySizeLimit = '10mb';

  app.use(timeout('900s'));
  app.use(json({ limit: bodySizeLimit }));
  app.use(urlencoded({ limit: bodySizeLimit, extended: true }));
  app.enableCors();
  app.use(helmet());
  /* istanbul ignore next */
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]): unknown =>
        new BadRequestException(errors),
      transform: true,
      whitelist: true,
      dismissDefaultMessages: false,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      validationError: {
        target: true,
        value: true,
      },
    }),
  );

  return app;
}
