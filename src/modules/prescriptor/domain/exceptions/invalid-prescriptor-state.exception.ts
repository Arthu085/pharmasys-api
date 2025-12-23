import { BadRequestException } from '@nestjs/common';

export class InvalidPrescriptorStateException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Estado (UF) inválido');
  }
}
