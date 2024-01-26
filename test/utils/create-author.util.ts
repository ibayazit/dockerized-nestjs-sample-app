import { INestApplication } from '@nestjs/common';
import { Author, Countries } from '@prisma/client-main';
import {
  CreateAuthorData,
  CreatorService,
} from '../../src/author/crud/creator.service';

type PartialData = Partial<CreateAuthorData>;

export function createAuthor(
  app: INestApplication,
  data: PartialData,
): Promise<Author> {
  const creator = app.get(CreatorService);

  const d: CreateAuthorData = {
    id: data.id ? data.id : undefined,
    name: data.name || 'George Orwell',
    country: data.country || Countries.EN,
    birthDate: data.birthDate || new Date(),
  };

  return creator.createOne(d);
}
