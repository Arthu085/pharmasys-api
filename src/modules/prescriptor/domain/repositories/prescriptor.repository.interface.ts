import { UpdateResult } from 'typeorm';
import { UUID } from 'crypto';

import { PrescriptorEntity } from '../entities/prescriptor.entity';
import { PrescriptorFilterDto } from '../../application/dtos/prescriptor-filter.dto';

export const IPrescriptorRepository = Symbol('IPrescriptorRepository');

export interface IPrescriptorRepository {
  findAll(
    filters: PrescriptorFilterDto,
    take: number,
    skip: number,
  ): Promise<[PrescriptorEntity[], number]>;

  findOne(uuid: UUID): Promise<PrescriptorEntity | null>;

  findByRegistrationNumberAndAdvice(
    registrationNumber: string,
    adviceId: number,
  ): Promise<PrescriptorEntity | null>;

  create(prescriptor: Partial<PrescriptorEntity>): Promise<PrescriptorEntity>;

  update(uuid: UUID, data: Partial<PrescriptorEntity>): Promise<UpdateResult>;

  softDelete(uuid: UUID): Promise<UpdateResult>;
}
