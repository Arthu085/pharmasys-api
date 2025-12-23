import { BadRequestException } from '@nestjs/common';

export class InvalidPrescriptorNameException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Nome de prescritor inválido');
  }
}
