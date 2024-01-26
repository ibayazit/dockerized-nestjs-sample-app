import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { CreatorService } from './crud/creator.service';
import { FinderService } from './crud/finder.service';
import { RemoverService } from './crud/remover.service';
import { UpdaterService } from './crud/updater.service';
import { AuthorDomainService } from './domain/domain.service';
import { ValidatorService } from './validator/validator.service';

@Module({
  controllers: [AuthorController],
  providers: [
    AuthorDomainService,
    AuthorService,
    CreatorService,
    FinderService,
    RemoverService,
    UpdaterService,
    ValidatorService,
  ],
  exports: [AuthorDomainService, FinderService],
})
export class AuthorModule {}
