import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Author, Prisma } from '@prisma/client-main';
import { FinderInterface } from '../../../libs/libs/interfaces/finder.interface';
import { AlreadyExistsException } from '../../../libs/libs/src/exceptions/already-exists.exception';
import { NotFoundException } from '../../../libs/libs/src/exceptions/not-found.exception';
import { PrismaMainClient } from '../../../prisma/prisma.client';

@Injectable()
export class FinderService implements FinderInterface<Author> {
  constructor(private readonly prisma: PrismaMainClient) {}

  findMany(options?: Prisma.AuthorFindManyArgs): Promise<Author[]> {
    try {
      return this.prisma.author.findMany(options);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(options: Prisma.AuthorFindUniqueOrThrowArgs): Promise<Author> {
    const entity = await this.prisma.author.findFirst(options);

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  async failOne(where: Prisma.AuthorWhereInput): Promise<boolean> {
    const entity = await this.prisma.author.findFirst({ where });

    if (entity) {
      throw new AlreadyExistsException();
    }

    return true;
  }

  findOneById(id: string): Promise<Author> {
    return this.findOne({ where: { id } });
  }
}
