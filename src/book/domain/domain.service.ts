import { Injectable } from '@nestjs/common';
import { FinderService } from '../crud/finder.service';

@Injectable()
export class BookDomainService {
  constructor(public readonly finder: FinderService) {}
}
