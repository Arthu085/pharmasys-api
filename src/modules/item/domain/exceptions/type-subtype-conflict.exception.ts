import { ConflictException } from '@nestjs/common';

export class TypeSubtypeConflictException extends ConflictException {
  constructor(message?: string) {
    super(message || 'Subtipo inválido para o tipo informado');
  }
}
