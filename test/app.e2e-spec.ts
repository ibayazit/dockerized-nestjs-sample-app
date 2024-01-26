import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { NestAppSetup } from './setup/app.setup';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const setup = await NestAppSetup();

    app = setup.app;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/health (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.data.status).toEqual('ok');
  });
});
