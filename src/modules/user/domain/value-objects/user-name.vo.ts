import { InvalidUserNameException } from '../exceptions/invalid-user-name.exception';

export class UserName {
  private constructor(private readonly value: string) {}

  static create(name: string): UserName {
    const trimmedName = name.trim();

    if (!trimmedName || trimmedName.length < 3) {
      throw new InvalidUserNameException(
        'Nome deve ter no mínimo 3 caracteres',
      );
    }

    if (trimmedName.length > 100) {
      throw new InvalidUserNameException(
        'Nome deve ter no máximo 100 caracteres',
      );
    }

    return new UserName(trimmedName);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UserName): boolean {
    return this.value === other.value;
  }
}
