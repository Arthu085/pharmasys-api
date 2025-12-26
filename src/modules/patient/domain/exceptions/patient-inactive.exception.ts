import { ForbiddenException } from '@nestjs/common';

export class PatientInactiveException extends ForbiddenException {
  constructor() {
    super('Paciente inativo');
  }
}
