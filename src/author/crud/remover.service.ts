import { Injectable } from '@nestjs/common';
import { Author } from '@prisma/client-main';
import { RemoverInterface } from '../../../libs/libs/interfaces/remover.interface';
import { CannotDeleteException } from '../../../libs/libs/src/exceptions/can-not-delete.exception';
import { PrismaMainClient } from '../../../prisma/prisma.client';

@Injectable()
export class RemoverService implements RemoverInterface<Author> {
  constructor(private readonly prisma: PrismaMainClient) {}

  async removeOneById(id: string): Promise<Author> {
    try {
      const entity = await this.prisma.author.delete({ where: { id } });

      return entity;
    } catch (error) {
      throw new CannotDeleteException();
    }
  }
}
