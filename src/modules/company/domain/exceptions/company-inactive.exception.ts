import { ForbiddenException } from '@nestjs/common';

export class CompanyInactiveException extends ForbiddenException {
  constructor() {
    super('Empresa inativa');
  }
}
