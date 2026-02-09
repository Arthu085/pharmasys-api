import { ConflictException } from '@nestjs/common';

export class EntityReferencedException extends ConflictException {
  constructor(message?: string) {
    super(message || 'Não é possível excluir: registro está em uso');
  }
}
