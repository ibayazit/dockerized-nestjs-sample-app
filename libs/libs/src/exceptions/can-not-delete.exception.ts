import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotDeleteException extends HttpException {
  constructor(message: string = 'Can not delete') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
