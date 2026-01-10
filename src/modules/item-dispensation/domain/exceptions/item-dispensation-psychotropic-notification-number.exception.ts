import { NotFoundException } from '@nestjs/common';

export class ItemDispensationPsychotropicNotificationNumberException extends NotFoundException {
  constructor() {
    super(
      'Número da notificação da prescrição é obrigatório para itens psicotrópicos',
    );
  }
}
