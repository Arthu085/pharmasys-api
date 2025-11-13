export class Email {
  private constructor(private readonly value: string) {}

  static create(email: string): Email {
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      throw new Error('Email é obrigatório');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      throw new Error('Email inválido');
    }

    if (trimmedEmail.length > 200) {
      throw new Error('Email deve ter no máximo 200 caracteres');
    }

    return new Email(trimmedEmail);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}
