import { InvalidPasswordException } from '../exceptions/invalid-password.exception';

export class UserPassword {
  private constructor(
    private readonly value: string,
    private readonly hashed: boolean,
  ) {}

  static create(plainPassword: string): UserPassword {
    if (!plainPassword) {
      throw new InvalidPasswordException('Senha é obrigatória');
    }

    if (plainPassword.length < 6) {
      throw new InvalidPasswordException(
        'Senha deve ter no mínimo 6 caracteres',
      );
    }

    if (plainPassword.length > 100) {
      throw new InvalidPasswordException(
        'Senha deve ter no máximo 100 caracteres',
      );
    }

    return new UserPassword(plainPassword, false);
  }

  static createFromHash(hashedPassword: string): UserPassword {
    if (!hashedPassword) {
      throw new InvalidPasswordException('Hash da senha é obrigatório');
    }

    return new UserPassword(hashedPassword, true);
  }

  getValue(): string {
    return this.value;
  }

  isHashed(): boolean {
    return this.hashed;
  }

  equals(other: UserPassword): boolean {
    return this.value === other.value && this.hashed === other.hashed;
  }
}
