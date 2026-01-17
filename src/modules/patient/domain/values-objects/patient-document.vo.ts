import { InvalidPatientDocumentException } from '../exceptions/invalid-patient-document.exception';
import { isValid } from 'cpf';

export class PatientDocument {
  private constructor(private readonly value: string) {}

  static create(document: string): PatientDocument {
    const trimmedDocument = document.trim().replace(/\D/g, '');

    if (!isValid(trimmedDocument)) {
      throw new InvalidPatientDocumentException();
    }

    return new PatientDocument(trimmedDocument);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PatientDocument): boolean {
    return this.value === other.value;
  }
}
