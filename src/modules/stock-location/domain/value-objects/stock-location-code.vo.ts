export class StockLocationCode {
  private constructor(private readonly value: string) {}

  static create(code: string): StockLocationCode {
    const normalizedCode = code.trim().toUpperCase();

    if (!normalizedCode) {
      throw new Error('Código do local de estoque é obrigatório');
    }

    if (normalizedCode.length > 50) {
      throw new Error(
        'Código do local de estoque deve ter no máximo 50 caracteres',
      );
    }

    return new StockLocationCode(normalizedCode);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: StockLocationCode): boolean {
    return this.value === other.value;
  }
}
