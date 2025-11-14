import { BadRequestException } from '@nestjs/common';

export class InvalidStateException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Estado (UF) inválido');
  }
}
