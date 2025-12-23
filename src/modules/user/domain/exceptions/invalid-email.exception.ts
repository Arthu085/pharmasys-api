import { BadRequestException } from '@nestjs/common';

export class InvalidEmailException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Email inválido');
  }
}
