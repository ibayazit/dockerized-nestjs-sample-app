import { Injectable } from '@nestjs/common';
import { FinderService } from './crud/finder.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ValidatorService } from './validator/validator.service';

@Injectable()
export class AuthorService {
  constructor(
    private readonly finder: FinderService,
    private readonly validator: ValidatorService,
  ) {}

  async create(data: CreateAuthorDto) {
    return this.validator.createOne(data);
  }

  findAll() {
    return this.finder.findMany();
  }

  async findOne(id: string) {
    return this.finder.findOne({
      where: { id },
      include: { Book: { take: 3, orderBy: { createdAt: 'desc' } } },
    });
  }

  async update(id: string, data: UpdateAuthorDto) {
    return this.validator.updateOne(id, data);
  }

  async remove(id: string) {
    return this.validator.removeOneById(id);
  }
}
