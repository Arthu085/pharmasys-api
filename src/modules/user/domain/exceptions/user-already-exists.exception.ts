import { ConflictException } from '@nestjs/common';

export class UserAlreadyExistsException extends ConflictException {
  constructor() {
    super('Já existe um usuário cadastrado com este email');
  }
}
