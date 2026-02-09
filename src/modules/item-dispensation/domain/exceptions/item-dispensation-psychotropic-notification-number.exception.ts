import { BadRequestException } from '@nestjs/common';

export class ItemDispensationPsychotropicNotificationNumberException extends BadRequestException {
  constructor() {
    super(
      'Número da notificação da prescrição é obrigatório para itens psicotrópicos',
    );
  }
}
