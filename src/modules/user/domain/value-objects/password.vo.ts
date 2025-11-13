export class Password {
  private constructor(
    private readonly value: string,
    private readonly hashed: boolean,
  ) {}

  static create(plainPassword: string): Password {
    if (!plainPassword) {
      throw new Error('Senha é obrigatória');
    }

    if (plainPassword.length < 6) {
      throw new Error('Senha deve ter no mínimo 6 caracteres');
    }

    if (plainPassword.length > 100) {
      throw new Error('Senha deve ter no máximo 100 caracteres');
    }

    return new Password(plainPassword, false);
  }

  static createFromHash(hashedPassword: string): Password {
    if (!hashedPassword) {
      throw new Error('Hash da senha é obrigatório');
    }

    return new Password(hashedPassword, true);
  }

  getValue(): string {
    return this.value;
  }

  isHashed(): boolean {
    return this.hashed;
  }

  equals(other: Password): boolean {
    return this.value === other.value && this.hashed === other.hashed;
  }
}
