import { Injectable } from '@nestjs/common';
import { Author } from '@prisma/client-main';
import { UpdaterInterface } from '../../../libs/libs/interfaces/updater.interface';
import { CannotUpdateException } from '../../../libs/libs/src/exceptions/can-not-update.exception';
import { PrismaMainClient } from '../../../prisma/prisma.client';
import { CreateAuthorData } from './creator.service';

export type UpdateAuthorData = Partial<CreateAuthorData>;

@Injectable()
export class UpdaterService implements UpdaterInterface<Author> {
  constructor(private readonly prisma: PrismaMainClient) {}

  async updateOne(id: string, data: UpdateAuthorData): Promise<Author> {
    try {
      const updated = await this.prisma.author.update({
        where: { id },
        data,
      });

      return updated;
    } catch (error) {
      throw new CannotUpdateException();
    }
  }
}
