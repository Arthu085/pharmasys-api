import { ForbiddenException } from '@nestjs/common';

export class BatchInactiveException extends ForbiddenException {
  constructor() {
    super('Lote inativo');
  }
}
