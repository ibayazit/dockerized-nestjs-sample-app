import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Book, Prisma } from '@prisma/client-main';
import { FinderInterface } from '../../../libs/libs/interfaces/finder.interface';
import { AlreadyExistsException } from '../../../libs/libs/src/exceptions/already-exists.exception';
import { NotFoundException } from '../../../libs/libs/src/exceptions/not-found.exception';
import { PrismaMainClient } from '../../../prisma/prisma.client';

@Injectable()
export class FinderService implements FinderInterface<Book> {
  constructor(private readonly prisma: PrismaMainClient) {}

  findMany(options?: Prisma.BookFindManyArgs): Promise<Book[]> {
    try {
      return this.prisma.book.findMany(options);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(options: Prisma.BookFindUniqueOrThrowArgs): Promise<Book> {
    const entity = await this.prisma.book.findFirst(options);

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  async failOne(where: Prisma.BookWhereInput): Promise<boolean> {
    const entity = await this.prisma.book.findFirst({ where });

    if (entity) {
      throw new AlreadyExistsException();
    }

    return true;
  }

  findOneById(id: string): Promise<Book> {
    return this.findOne({ where: { id } });
  }
}
