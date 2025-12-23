import { BadRequestException } from '@nestjs/common';

export class isCentralStockStockLocationException extends BadRequestException {
  constructor() {
    super('Não é permitido alterar ou desativar o estoque central');
  }
}
