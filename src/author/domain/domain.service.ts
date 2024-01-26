import { Injectable } from '@nestjs/common';
import { FinderService } from '../crud/finder.service';

@Injectable()
export class AuthorDomainService {
  constructor(public readonly finder: FinderService) {}
}
