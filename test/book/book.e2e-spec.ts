import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaMainClient } from '../../prisma/prisma.client';
import { CreateBookDto } from '../../src/book/dto/create-book.dto';
import { UpdateBookDto } from '../../src/book/dto/update-book.dto';
import { NestAppSetup } from '../setup/app.setup';
import { NestAppTruncate } from '../setup/app.truncate';
import { createAuthor } from '../utils/create-author.util';
import { createBook } from '../utils/create-book.util';

describe('BookController (e2e)', () => {
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

  it('/api/book (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/api/book');

    expect(response.status).toBe(200);
  });

  it('/api/book/:id (GET)', async () => {
    const book = await createBook(app, {
      title: 'Book 1',
    });

    const response = await request(app.getHttpServer()).get(
      `/api/book/${book.id}`,
    );

    expect(response.status).toBe(200);
  });

  it('/api/book (POST)', async () => {
    const author = await createAuthor(app, {
      name: 'Book Author 1',
    });

    const data: CreateBookDto = {
      title: 'Book 1',
      authorId: author.id,
      price: 10,
      ISBN: '9786555522654',
      language: 'TR',
      numberOfPage: 100,
      publisher: 'Some Publisher',
    };

    const response = await request(app.getHttpServer())
      .post('/api/book')
      .send(data);

    expect(response.status).toBe(201);
  });

  it('/api/book (POST) - Fail', async () => {
    const data: CreateBookDto = {
      title: 'Book 1',
      authorId: '11a1aaaa11aa1a1a1111a1a1',
      price: 10,
      ISBN: '9786555522654',
      language: 'TR',
      numberOfPage: 100,
      publisher: 'Some Publisher',
    };

    const response = await request(app.getHttpServer())
      .post('/api/book')
      .send(data);

    expect(response.status).toBe(404);
  });

  it('/api/book/:id (DELETE)', async () => {
    const book = await createBook(app, {
      title: 'Book 2',
    });

    const response = await request(app.getHttpServer()).delete(
      `/api/book/${book.id}`,
    );

    expect(response.status).toBe(200);
  });

  it('/api/book/:id (PATCH)', async () => {
    const author = await createAuthor(app, {
      name: 'Book Author 3',
    });

    const book = await createBook(app, {
      title: 'Book 3',
      authorId: author.id,
    });

    const data: UpdateBookDto = {
      title: 'Book 1 Updated',
    };

    const response = await request(app.getHttpServer())
      .patch(`/api/book/${book.id}`)
      .send(data);

    expect(response.status).toBe(200);
  });

  it('/api/book/:id (PATCH) - Fail', async () => {
    const author = await createAuthor(app, {
      name: 'Book Author 4',
    });

    const book = await createBook(app, {
      title: 'Book 4',
      authorId: author.id,
    });

    const data: UpdateBookDto = {
      title: 'Book 1 Updated',
      authorId: '11a1aaaa11aa1a1a1111a1a1',
    };

    const response = await request(app.getHttpServer())
      .patch(`/api/book/${book.id}`)
      .send(data);

    expect(response.status).toBe(404);
  });
});
