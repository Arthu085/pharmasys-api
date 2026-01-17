import { InvalidTransferRequestDateException } from '../exceptions/invalid-transfer-request-date.exception';

export class TransferRequestDate {
  private constructor(private readonly value: Date) {}

  static create(transferDate: Date): TransferRequestDate {
    if (!transferDate) {
      throw new InvalidTransferRequestDateException(
        'Data de requisição de transferência é obrigatória',
      );
    }

    return new TransferRequestDate(transferDate);
  }

  getValue(): Date {
    return this.value;
  }
}
