import { ForbiddenException } from '@nestjs/common';

export class PrescriptorInactiveException extends ForbiddenException {
  constructor() {
    super('Prescritor inativo');
  }
}
