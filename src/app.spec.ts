import { INestApplication } from '@nestjs/common';
import createApp from './app';

describe('Create App', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createApp();
  });

  it('should create app', async () => {
    expect(app).toBeDefined();
  });
});
