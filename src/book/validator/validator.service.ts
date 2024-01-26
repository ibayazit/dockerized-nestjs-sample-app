import { Injectable } from '@nestjs/common';
import { AuthorDomainService } from '../../author/domain/domain.service';
import { CreatorService } from '../crud/creator.service';
import { RemoverService } from '../crud/remover.service';
import { UpdaterService } from '../crud/updater.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

@Injectable()
export class ValidatorService {
  constructor(
    private readonly author: AuthorDomainService,
    private readonly creator: CreatorService,
    private readonly remover: RemoverService,
    private readonly updater: UpdaterService,
  ) {}

  async createOne(data: CreateBookDto) {
    await this.author.finder.findOneById(data.authorId);

    return this.creator.createOne(data);
  }

  async updateOne(id: string, data: UpdateBookDto) {
    if (data.authorId) {
      await this.author.finder.findOneById(data.authorId);
    }

    return this.updater.updateOne(id, data);
  }

  async removeOneById(id: string) {
    return this.remover.removeOneById(id);
  }
}
