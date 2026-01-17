import { InvalidItemDispensationNotificationNumberException } from '../exceptions/invalid-item-dispensation-notification-number.exception';

export class ItemDispensationNotificationNumber {
  private constructor(private readonly value: string) {}

  static create(
    notificationNumber: string,
  ): ItemDispensationNotificationNumber {
    const trimmedNotificationNumber = notificationNumber.trim();

    if (!trimmedNotificationNumber || trimmedNotificationNumber.length < 3) {
      throw new InvalidItemDispensationNotificationNumberException(
        'Número de notificação da prescrição deve ter no mínimo 3 caracteres',
      );
    }

    if (trimmedNotificationNumber.length > 50) {
      throw new InvalidItemDispensationNotificationNumberException(
        'Número de notificação da prescrição deve ter no máximo 50 caracteres',
      );
    }

    return new ItemDispensationNotificationNumber(trimmedNotificationNumber);
  }

  getValue(): string {
    return this.value;
  }
}
