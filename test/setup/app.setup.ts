import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { HttpExceptionFilter } from '../../libs/libs/src/filters/http-exception.filter';
import { PrismaMainClient } from '../../prisma/prisma.client';
import { AppModule } from '../../src/app.module';

export async function NestAppSetup() {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const prisma = moduleFixture.get<PrismaMainClient>(PrismaMainClient);

  const app = moduleFixture.createNestApplication();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api');

  await app.init();

  return { app, prisma };
}
