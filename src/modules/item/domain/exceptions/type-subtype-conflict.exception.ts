import { ConflictException } from '@nestjs/common';

export class TypeSubtypeConflictException extends ConflictException {
  constructor() {
    super('Subtipo só pode ser definido para Medicamentos');
  }
}
