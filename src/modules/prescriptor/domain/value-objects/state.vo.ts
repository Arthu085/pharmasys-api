import { UfEnum } from '../enums/uf.enum';

export class State {
  private constructor(private readonly value: string) {}

  static create(state: string): State {
    const upperState = state.toUpperCase().trim();

    if (!upperState) {
      throw new Error('UF é obrigatória');
    }

    if (!Object.values(UfEnum).includes(upperState as UfEnum)) {
      throw new Error('UF inválida');
    }

    if (upperState.length !== 2) {
      throw new Error('UF deve ter 2 caracteres');
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
