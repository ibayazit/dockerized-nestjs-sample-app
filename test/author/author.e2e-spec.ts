import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaMainClient } from '../../prisma/prisma.client';
import { CreateAuthorDto } from '../../src/author/dto/create-author.dto';
import { UpdateAuthorDto } from '../../src/author/dto/update-author.dto';
import { NestAppSetup } from '../setup/app.setup';
import { NestAppTruncate } from '../setup/app.truncate';
import { createAuthor } from '../utils/create-author.util';

describe('AuthorController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaMainClient;

  beforeEach(async () => {
    const setup = await NestAppSetup();

    app = setup.app;
    prisma = setup.prisma;
  });

  afterAll(async () => {
    await NestAppTruncate(prisma);
    await app.close();
  });

  it('/api/author (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/api/author');

    expect(response.status).toBe(200);
  });

  it('/api/author/:id (GET)', async () => {
    const author = await createAuthor(app, {
      name: 'Author 1',
    });

    const response = await request(app.getHttpServer()).get(
      `/api/author/${author.id}`,
    );

    expect(response.status).toBe(200);
  });

  it('/api/author (POST)', async () => {
    const data: CreateAuthorDto = {
      name: 'Ibrahim Bayazit',
      birthDate: new Date('1998-07-29'),
      country: 'TR',
    };

    const response = await request(app.getHttpServer())
      .post('/api/author')
      .send(data);

    expect(response.status).toBe(201);
  });

  it('/api/author/:id (DELETE)', async () => {
    const author = await createAuthor(app, {
      name: 'Author 2',
    });

    const response = await request(app.getHttpServer()).delete(
      `/api/author/${author.id}`,
    );

    expect(response.status).toBe(200);
  });

  it('/api/author/:id (PATCH)', async () => {
    const author = await createAuthor(app, {
      name: 'Author 3',
    });

    const data: UpdateAuthorDto = {
      name: 'Ibrahim Bayazit Updated',
    };

    const response = await request(app.getHttpServer())
      .patch(`/api/author/${author.id}`)
      .send(data);

    expect(response.status).toBe(200);
  });
});
