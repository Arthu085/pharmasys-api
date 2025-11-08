import { BadRequestException } from '@nestjs/common';

export class RoleException extends BadRequestException {
  constructor() {
    super('Função do usuário inválida');
  }
}
