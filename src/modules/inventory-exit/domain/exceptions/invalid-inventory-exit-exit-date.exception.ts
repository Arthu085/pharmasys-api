import { BadRequestException } from '@nestjs/common';

export class InvalidInventoryExitExitDateException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Data de saída inválida');
  }
}
