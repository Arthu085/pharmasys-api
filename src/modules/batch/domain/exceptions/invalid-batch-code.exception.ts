import { BadRequestException } from '@nestjs/common';

export class InvalidBatchCodeException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Código de lote inválido');
  }
}
