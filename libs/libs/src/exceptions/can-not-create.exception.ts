import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotCreateException extends HttpException {
  constructor(message: string = 'Can not create') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
