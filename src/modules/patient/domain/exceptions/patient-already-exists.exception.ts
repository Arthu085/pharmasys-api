import { ConflictException } from '@nestjs/common';

export class PatientAlreadyExistsException extends ConflictException {
  constructor() {
    super('Já existe um paciente cadastrado com este documento');
  }
}
