export class PrescriptorName {
  private constructor(private readonly value: string) {}

  static create(name: string): PrescriptorName {
    const trimmedName = name.trim();

    if (!trimmedName || trimmedName.length < 3) {
      throw new Error('Nome do prescritor deve ter no mínimo 3 caracteres');
    }

    if (trimmedName.length > 150) {
      throw new Error('Nome do prescritor deve ter no máximo 150 caracteres');
    }

    return new PrescriptorName(trimmedName);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PrescriptorName): boolean {
    return this.value === other.value;
  }
}
