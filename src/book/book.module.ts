import { Module } from '@nestjs/common';
import { AuthorModule } from '../author/author.module';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { CreatorService } from './crud/creator.service';
import { FinderService } from './crud/finder.service';
import { RemoverService } from './crud/remover.service';
import { UpdaterService } from './crud/updater.service';
import { BookDomainService } from './domain/domain.service';
import { ValidatorService } from './validator/validator.service';

@Module({
  imports: [AuthorModule],
  controllers: [BookController],
  providers: [
    BookDomainService,
    BookService,
    CreatorService,
    FinderService,
    RemoverService,
    UpdaterService,
    ValidatorService,
  ],
  exports: [BookDomainService, FinderService],
})
export class BookModule {}
