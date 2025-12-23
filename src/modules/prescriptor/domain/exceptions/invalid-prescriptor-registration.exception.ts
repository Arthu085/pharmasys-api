import { BadRequestException } from '@nestjs/common';

export class InvalidPrescriptorRegistrationException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Número de registro inválido');
  }
}
