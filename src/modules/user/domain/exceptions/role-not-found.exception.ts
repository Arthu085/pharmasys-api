import { NotFoundException } from '@nestjs/common';

export class RoleNotFoundException extends NotFoundException {
  constructor() {
    super('Função não encontrada');
  }
}
