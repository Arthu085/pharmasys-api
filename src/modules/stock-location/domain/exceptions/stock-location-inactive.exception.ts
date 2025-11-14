import { ForbiddenException } from '@nestjs/common';

export class StockLocationInactiveException extends ForbiddenException {
  constructor() {
    super('Local de estoque inativo');
  }
}
