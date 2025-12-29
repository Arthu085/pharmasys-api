import { InvalidBatchCodeException } from '../exceptions/invalid-batch-code.exception';

export class BatchCode {
  private constructor(private readonly value: string) {}

  static create(code: string): BatchCode {
    const trimmedCode = code.trim().toUpperCase();

    if (!trimmedCode || trimmedCode.length < 1) {
      throw new InvalidBatchCodeException(
        'Código de lote deve ter no mínimo 1 caractere',
      );
    }

    if (trimmedCode.length > 20) {
      throw new InvalidBatchCodeException(
        'Código de lote deve ter no máximo 20 caracteres',
      );
    }

    return new BatchCode(trimmedCode);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: BatchCode): boolean {
    return this.value === other.value;
  }
}
