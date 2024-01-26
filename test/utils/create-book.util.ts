import { INestApplication } from '@nestjs/common';
import { Book, Languages } from '@prisma/client-main';
import {
  CreateBookData,
  CreatorService,
} from '../../src/book/crud/creator.service';
import { createAuthor } from './create-author.util';

type PartialData = Partial<CreateBookData>;

export async function createBook(
  app: INestApplication,
  data: PartialData,
): Promise<Book> {
  const creator = app.get(CreatorService);

  const authorId = data.authorId
    ? data.authorId
    : (await createAuthor(app, {})).id;

  const d: CreateBookData = {
    id: data.id ? data.id : undefined,
    title: data.title ?? '1984',
    authorId: authorId,
    price: data.price ?? 100,
    ISBN: data.ISBN ?? '9786555522655',
    language: data.language ?? Languages.EN,
    numberOfPage: data.numberOfPage ?? 328,
    publisher: data.publisher ?? 'Some Publisher',
  };

  return creator.createOne(d);
}
