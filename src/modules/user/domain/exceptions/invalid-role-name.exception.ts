import { BadRequestException } from '@nestjs/common';

export class InvalidRoleNameException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Nome de função inválido');
  }
}
