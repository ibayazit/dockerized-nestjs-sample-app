import { Injectable } from '@nestjs/common';
import { Book } from '@prisma/client-main';
import { UpdaterInterface } from '../../../libs/libs/interfaces/updater.interface';
import { CannotUpdateException } from '../../../libs/libs/src/exceptions/can-not-update.exception';
import { PrismaMainClient } from '../../../prisma/prisma.client';
import { CreateBookData } from './creator.service';

export type UpdateBookData = Partial<CreateBookData>;

@Injectable()
export class UpdaterService implements UpdaterInterface<Book> {
  constructor(private readonly prisma: PrismaMainClient) {}

  async updateOne(id: string, data: UpdateBookData): Promise<Book> {
    try {
      const updated = await this.prisma.book.update({
        where: { id },
        data,
      });

      return updated;
    } catch (error) {
      throw new CannotUpdateException();
    }
  }
}
