import { Injectable } from '@nestjs/common';
import { Author, Countries } from '@prisma/client-main';
import { CreatorInterface } from '../../../libs/libs/interfaces/creator.interface';
import { CannotCreateException } from '../../../libs/libs/src/exceptions/can-not-create.exception';
import { PrismaMainClient } from '../../../prisma/prisma.client';

export class CreateAuthorData {
  id?: string;
  name: string;
  country: Countries;
  birthDate: Date;
}

@Injectable()
export class CreatorService implements CreatorInterface<Author> {
  constructor(private readonly prisma: PrismaMainClient) {}

  async createOne(data: CreateAuthorData): Promise<Author> {
    try {
      const entity = await this.prisma.author.create({
        data: {
          id: data.id,
          name: data.name,
          country: data.country,
          birthDate: data.birthDate,
        },
      });

      return entity;
    } catch (error) {
      throw new CannotCreateException();
    }
  }
}
