import { BadRequestException } from '@nestjs/common';

export class InvalidCompanyCnpjException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'CNPJ de empresa inválido');
  }
}
