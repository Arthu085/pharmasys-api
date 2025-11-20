import { InvalidCompanyNameException } from '../exceptions/invalid-company-name.exception';

export class CompanyName {
  private constructor(private readonly value: string) {}

  static create(name: string): CompanyName {
    const trimmedName = name.trim();

    if (!trimmedName || trimmedName.length < 3) {
      throw new InvalidCompanyNameException(
        'Nome da empresa deve ter no mínimo 3 caracteres',
      );
    }

    if (trimmedName.length > 255) {
      throw new InvalidCompanyNameException(
        'Nome da empresa deve ter no máximo 255 caracteres',
      );
    }

    return new CompanyName(trimmedName);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: CompanyName): boolean {
    return this.value === other.value;
  }
}
