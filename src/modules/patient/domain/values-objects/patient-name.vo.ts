import { InvalidPatientNameException } from '../exceptions/invalid-patient-name.exception';

export class PatientName {
  private constructor(private readonly value: string) {}

  static create(name: string): PatientName {
    const trimmedName = name.trim();

    if (!trimmedName || trimmedName.length < 3) {
      throw new InvalidPatientNameException(
        'Nome do paciente deve ter no mínimo 3 caracteres',
      );
    }

    if (trimmedName.length > 150) {
      throw new InvalidPatientNameException(
        'Nome do paciente deve ter no máximo 150 caracteres',
      );
    }

    return new PatientName(trimmedName);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PatientName): boolean {
    return this.value === other.value;
  }
}
