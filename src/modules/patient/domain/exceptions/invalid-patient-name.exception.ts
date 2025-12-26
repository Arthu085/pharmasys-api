import { BadRequestException } from '@nestjs/common';

export class InvalidPatientNameException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Nome de paciente inválido');
  }
}
