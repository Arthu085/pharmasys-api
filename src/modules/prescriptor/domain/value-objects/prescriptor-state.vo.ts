import { UfEnum } from '../enums/uf.enum';
import { InvalidPrescriptorStateException } from '../exceptions/invalid-prescriptor-state.exception';

export class PrescriptorState {
  private constructor(private readonly value: string) {}

  static create(state: string): PrescriptorState {
    const upperState = state.toUpperCase().trim();

    if (!upperState) {
      throw new InvalidPrescriptorStateException('UF é obrigatória');
    }

    if (!Object.values(UfEnum).includes(upperState as UfEnum)) {
      throw new InvalidPrescriptorStateException('UF inválida');
    }

    if (upperState.length !== 2) {
      throw new InvalidPrescriptorStateException('UF deve ter 2 caracteres');
    }

    return new PrescriptorState(upperState);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PrescriptorState): boolean {
    return this.value === other.value;
  }
}
