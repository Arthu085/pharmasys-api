import { ForbiddenException } from '@nestjs/common';

export class ItemInactiveException extends ForbiddenException {
  constructor() {
    super('Item inativo');
  }
}
