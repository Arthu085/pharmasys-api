export class ItemName {
  private constructor(private readonly value: string) {}

  static create(name: string): ItemName {
    const trimmedName = name.trim();

    if (!trimmedName || trimmedName.length < 3) {
      throw new Error('Nome do item deve ter no mínimo 3 caracteres');
    }

    if (trimmedName.length > 255) {
      throw new Error('Nome do item deve ter no máximo 255 caracteres');
    }

    return new ItemName(trimmedName);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: ItemName): boolean {
    return this.value === other.value;
  }
}
