import { InvalidCompanyCnpjException } from '../exceptions/invalid-company-cnpj.excepion';

export class CompanyCnpj {
  private constructor(private readonly value: string) {}

  static create(cnpj: string): CompanyCnpj {
    const formatedCnpj = cnpj.trim().toUpperCase();

    if (!formatedCnpj || formatedCnpj.length !== 14) {
      throw new InvalidCompanyCnpjException(
        'CNPJ da empresa deve ter no mínimo e máximo 14 caracteres',
      );
    }

    return new CompanyCnpj(formatedCnpj);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: CompanyCnpj): boolean {
    return this.value === other.value;
  }
}
