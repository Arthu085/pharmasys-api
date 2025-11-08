import { ConflictException } from '@nestjs/common';

export class SameStatusUserException extends ConflictException {
  constructor() {
    super('Não é possível alterar para o mesmo status');
  }
}
