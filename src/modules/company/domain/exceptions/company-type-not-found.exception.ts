import { NotFoundException } from '@nestjs/common';

export class CompanyTypeNotFoundException extends NotFoundException {
  constructor() {
    super('Tipo de empresa não encontrado');
  }
}
