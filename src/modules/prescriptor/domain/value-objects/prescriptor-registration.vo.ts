import { InvalidPrescriptorRegistrationException } from '../exceptions/invalid-prescriptor-registration.exception';

export class PrescriptorRegistration {
  private constructor(private readonly value: string) {}

  static create(registrationNumber: string): PrescriptorRegistration {
    const trimmedNumber = registrationNumber.trim();

    if (!trimmedNumber) {
      throw new InvalidPrescriptorRegistrationException(
        'Número de registro é obrigatório',
      );
    }

    if (trimmedNumber.length > 30) {
      throw new InvalidPrescriptorRegistrationException(
        'Número de registro deve ter no máximo 30 caracteres',
      );
    }

    return new PrescriptorRegistration(trimmedNumber);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PrescriptorRegistration): boolean {
    return this.value === other.value;
  }
}
