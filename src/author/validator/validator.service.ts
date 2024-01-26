import { Injectable } from '@nestjs/common';
import { CreatorService } from '../crud/creator.service';
import { FinderService } from '../crud/finder.service';
import { RemoverService } from '../crud/remover.service';
import { UpdaterService } from '../crud/updater.service';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';

@Injectable()
export class ValidatorService {
  constructor(
    private readonly finder: FinderService,
    private readonly creator: CreatorService,
    private readonly remover: RemoverService,
    private readonly updater: UpdaterService,
  ) {}

  async createOne(data: CreateAuthorDto) {
    await this.finder.failOne({ name: data.name });

    return this.creator.createOne(data);
  }

  async updateOne(id: string, data: UpdateAuthorDto) {
    await this.finder.failOne({ id: { not: id }, name: data.name });

    return this.updater.updateOne(id, data);
  }

  async removeOneById(id: string) {
    return this.remover.removeOneById(id);
  }
}
