import { BadRequestException } from '@nestjs/common';

export class InvalidItemDispensationNotificationNumberException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Número de notificação da prescrição inválido');
  }
}
