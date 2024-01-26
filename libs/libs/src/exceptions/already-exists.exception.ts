import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyExistsException extends HttpException {
  constructor(message: string = 'Resource already exists') {
    super(message, HttpStatus.NOT_FOUND);
  }
}
