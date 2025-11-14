import { BadRequestException } from '@nestjs/common';

export class InvalidUserNameException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Nome de usuário inválido');
  }
}
