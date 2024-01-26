import { Injectable } from '@nestjs/common';
import { Book, Languages } from '@prisma/client-main';
import { CreatorInterface } from '../../../libs/libs/interfaces/creator.interface';
import { CannotCreateException } from '../../../libs/libs/src/exceptions/can-not-create.exception';
import { PrismaMainClient } from '../../../prisma/prisma.client';

export class CreateBookData {
  id?: string;
  title: string;
  authorId: string;
  price: number;
  ISBN: string;
  language: Languages;
  numberOfPage: number;
  publisher: string;
}

@Injectable()
export class CreatorService implements CreatorInterface<Book> {
  constructor(private readonly prisma: PrismaMainClient) {}

  async createOne(data: CreateBookData): Promise<Book> {
    try {
      const entity = await this.prisma.book.create({
        data: {
          id: data.id,
          title: data.title,
          authorId: data.authorId,
          price: data.price,
          ISBN: data.ISBN,
          language: data.language,
          numberOfPage: data.numberOfPage,
          publisher: data.publisher,
        },
      });

      return entity;
    } catch (error) {
      throw new CannotCreateException();
    }
  }
}
