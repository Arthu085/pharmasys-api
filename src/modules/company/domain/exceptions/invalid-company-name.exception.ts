import { BadRequestException } from '@nestjs/common';

export class InvalidCompanyNameException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Nome de empresa inválido');
  }
}
