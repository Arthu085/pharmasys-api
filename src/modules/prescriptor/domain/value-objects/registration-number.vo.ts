export class RegistrationNumber {
  private constructor(private readonly value: string) {}

  static create(registrationNumber: string): RegistrationNumber {
    const trimmedNumber = registrationNumber.trim();

    if (!trimmedNumber) {
      throw new Error('Número de registro é obrigatório');
    }

    if (trimmedNumber.length > 30) {
      throw new Error('Número de registro deve ter no máximo 30 caracteres');
    }

    return new RegistrationNumber(trimmedNumber);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: RegistrationNumber): boolean {
    return this.value === other.value;
  }
}
