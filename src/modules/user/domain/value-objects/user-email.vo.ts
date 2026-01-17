import { InvalidEmailException } from '../exceptions/invalid-email.exception';

export class UserEmail {
  private constructor(private readonly value: string) {}

  static create(email: string): UserEmail {
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      throw new InvalidEmailException('Email é obrigatório');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      throw new InvalidEmailException('Email inválido');
    }

    if (trimmedEmail.length > 200) {
      throw new InvalidEmailException(
        'Email deve ter no máximo 200 caracteres',
      );
    }

    return new UserEmail(trimmedEmail);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UserEmail): boolean {
    return this.value === other.value;
  }
}
