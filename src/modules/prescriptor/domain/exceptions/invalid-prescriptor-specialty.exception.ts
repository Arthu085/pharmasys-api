import { BadRequestException } from '@nestjs/common';

export class InvalidPrescriptorSpecialtyException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Especialidade inválida');
  }
}
