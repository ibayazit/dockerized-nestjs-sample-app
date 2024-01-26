import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotUpdateException extends HttpException {
  constructor(message: string = 'Can not update') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
