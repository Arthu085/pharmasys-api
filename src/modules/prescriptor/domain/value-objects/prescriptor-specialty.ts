import { InvalidPrescriptorSpecialtyException } from '../exceptions/invalid-prescriptor-specialty.exception';

export class PrescriptorSpecialty {
  private constructor(private readonly value: string) {}

  static create(specialty: string): PrescriptorSpecialty {
    const trimmedSpecialty = specialty.trim();

    if (!trimmedSpecialty || trimmedSpecialty.length < 3) {
      throw new InvalidPrescriptorSpecialtyException(
        'A especialidade deve ter no mínimo 3 caracteres',
      );
    }

    if (trimmedSpecialty.length > 150) {
      throw new InvalidPrescriptorSpecialtyException(
        'A especialidade deve ter no máximo 150 caracteres',
      );
    }

    return new PrescriptorSpecialty(trimmedSpecialty);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PrescriptorSpecialty): boolean {
    return this.value === other.value;
  }
}
