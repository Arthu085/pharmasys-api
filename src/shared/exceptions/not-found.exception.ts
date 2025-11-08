import { NotFoundException } from '@nestjs/common';

type Gender = 'o' | 'a';

export class NotFoundGenericException extends NotFoundException {
  constructor(entityName: string, gender: Gender = 'o') {
    const article = gender === 'o' ? 'o' : 'a';
    const suffix = gender === 'o' ? 'encontrado' : 'encontrada';
    super(`${entityName} não ${suffix}`);
  }
}
