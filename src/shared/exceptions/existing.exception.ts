import { ConflictException } from '@nestjs/common';

type Gender = 'o' | 'a';

export class ExistingGenericException extends ConflictException {
  constructor(entityName: string, gender: Gender = 'o') {
    const article = gender === 'o' ? 'um' : 'uma';
    const suffix = gender === 'o' ? 'cadastrado' : 'cadastrada';
    super(`Já existe ${article} ${entityName} ${suffix} com estes dados.`);
  }
}
