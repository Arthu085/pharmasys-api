import { ForbiddenException } from '@nestjs/common';

type Gender = 'o' | 'a';

export class InactiveGenericException extends ForbiddenException {
  constructor(entityName: string, gender: Gender = 'o') {
    const article = gender === 'o' ? 'o' : 'a';
    const suffix = gender === 'o' ? 'inativo' : 'inativa';
    super(`${entityName} ${suffix}`);
  }
}
