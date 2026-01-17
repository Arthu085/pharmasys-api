import { ConflictException } from '@nestjs/common';

export class CompanyAlreadyExistsException extends ConflictException {
  constructor() {
    super('Já existe uma empresa cadastrada com este CNPJ');
  }
}
