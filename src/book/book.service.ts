import { Injectable } from '@nestjs/common';
import { FinderService } from './crud/finder.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ValidatorService } from './validator/validator.service';

@Injectable()
export class BookService {
  constructor(
    private readonly finder: FinderService,
    private readonly validator: ValidatorService,
  ) {}

  create(data: CreateBookDto) {
    return this.validator.createOne(data);
  }

  findAll() {
    return this.finder.findMany();
  }

  findOne(id: string) {
    return this.finder.findOne({
      where: { id },
      include: { author: true },
    });
  }

  update(id: string, data: UpdateBookDto) {
    return this.validator.updateOne(id, data);
  }

  remove(id: string) {
    return this.validator.removeOneById(id);
  }
}
