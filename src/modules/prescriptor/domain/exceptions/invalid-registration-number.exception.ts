import { BadRequestException } from '@nestjs/common';

export class InvalidRegistrationNumberException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Número de registro inválido');
  }
}
