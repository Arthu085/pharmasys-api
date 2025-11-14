import { UfEnum } from '../enums/uf.enum';
import { InvalidStateException } from '../exceptions/invalid-state.exception';

export class State {
  private constructor(private readonly value: string) {}

  static create(state: string): State {
    const upperState = state.toUpperCase().trim();

    if (!upperState) {
      throw new InvalidStateException('UF é obrigatória');
    }

    if (!Object.values(UfEnum).includes(upperState as UfEnum)) {
      throw new InvalidStateException('UF inválida');
    }

    if (upperState.length !== 2) {
      throw new InvalidStateException('UF deve ter 2 caracteres');
    }

    return new State(upperState);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: State): boolean {
    return this.value === other.value;
  }
}
