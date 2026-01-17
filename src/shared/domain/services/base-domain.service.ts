import { Injectable } from '@nestjs/common';
import { SameStatusException } from '../../exceptions/same-status.exception';
import { StatusEnum } from '../../enums/status.enum';

@Injectable()
export class BaseDomainService {
  validateDifferentStatus<T extends { status: StatusEnum }>(
    entity: T,
    newStatus: StatusEnum,
  ): void {
    if (entity.status === newStatus) {
      throw new SameStatusException();
    }
  }
}
