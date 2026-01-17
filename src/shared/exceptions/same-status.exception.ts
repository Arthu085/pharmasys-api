import { ConflictException } from '@nestjs/common';

export class SameStatusException extends ConflictException {
  constructor() {
    super('Não é possível alterar para o mesmo status');
  }
}
