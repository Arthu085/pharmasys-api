import { BadRequestException } from '@nestjs/common';

export class InvalidItemDispensationDateException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Data de dispensação inválida');
  }
}
