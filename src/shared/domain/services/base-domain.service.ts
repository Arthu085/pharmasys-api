import { Injectable } from '@nestjs/common';
import { NotFoundGenericException } from '../../exceptions/not-found.exception';
import { InactiveGenericException } from '../../exceptions/inactive.exception';
import { SameStatusException } from '../../exceptions/same-status.exception';
import { StatusEnum } from '../../enums/status.enum';

@Injectable()
export class BaseDomainService {
  validateEntityExists<T>(
    entity: T | null,
    entityName: string,
    gender: 'o' | 'a' = 'o',
  ): T {
    if (!entity) {
      throw new NotFoundGenericException(entityName, gender);
    }

    return entity;
  }

  validateEntityActive<T extends { status: StatusEnum }>(
    entity: T,
    entityName: string,
    gender: 'o' | 'a' = 'o',
  ): T {
    if (entity.status === StatusEnum.INATIVO) {
      throw new InactiveGenericException(entityName, gender);
    }

    return entity;
  }

  validateDifferentStatus<T extends { status: StatusEnum }>(
    entity: T,
    newStatus: StatusEnum,
  ): void {
    if (entity.status === newStatus) {
      throw new SameStatusException();
    }
  }
}
