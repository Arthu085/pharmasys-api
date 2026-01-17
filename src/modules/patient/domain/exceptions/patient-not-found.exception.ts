import { NotFoundException } from '@nestjs/common';

export class PatientNotFoundException extends NotFoundException {
  constructor() {
    super('Paciente não encontrado');
  }
}
