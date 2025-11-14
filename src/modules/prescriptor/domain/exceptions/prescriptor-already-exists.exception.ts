import { ConflictException } from '@nestjs/common';

export class PrescriptorAlreadyExistsException extends ConflictException {
  constructor() {
    super(
      'Já existe um prescritor cadastrado com este número de registro neste conselho',
    );
  }
}
