import { UnauthorizedException } from '@nestjs/common';

export class InactiveUserException extends UnauthorizedException {
  constructor() {
    super('Usuário inativo, solicite a reativação com o administrador');
  }
}
