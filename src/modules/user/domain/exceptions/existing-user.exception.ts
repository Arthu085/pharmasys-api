import { ConflictException } from '@nestjs/common';

export class ExistingUserException extends ConflictException {
  constructor() {
    super('Já existe um usuário cadastrado com este e-mail');
  }
}
