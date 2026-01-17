import { InvalidTransferRequestItemQuantityException } from '../exceptions/invalid-transfer-request-item-quantity.exception';

export class TransferRequestItemQuantity {
  private constructor(private readonly value: number) {}

  static create(quantity: number): TransferRequestItemQuantity {
    if (!quantity) {
      throw new InvalidTransferRequestItemQuantityException(
        'Quantidade é obrigatória',
      );
    }

    if (quantity < 0) {
      throw new InvalidTransferRequestItemQuantityException(
        'Quantidade não pode ser negativa',
      );
    }

    return new TransferRequestItemQuantity(quantity);
  }

  getValue(): number {
    return this.value;
  }
}
