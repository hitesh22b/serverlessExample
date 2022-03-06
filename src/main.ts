import { INestApplication } from '@nestjs/common';
import createApp from './app';

async function bootstrap() {
  const DEFAULT_PORT = parseInt(process.env.PORT || '9090', 10);
  const app: INestApplication = await createApp();
  await app.init();
  await app.listen(DEFAULT_PORT);
}

/* istanbul ignore next */
// eslint-disable-next-line no-console
bootstrap().catch((err) => console.log((err as Error).message));

export { bootstrap };
