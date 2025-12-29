import { ConflictException } from '@nestjs/common';

export class BatchAlreadyExistsException extends ConflictException {
  constructor() {
    super('Já existe um lote cadastrado com este código');
  }
}
