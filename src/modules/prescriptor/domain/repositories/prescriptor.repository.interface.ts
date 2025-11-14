import { UpdateResult } from 'typeorm';
import { PrescriptorEntity } from '../entities/prescriptor.entity';
import { PrescriptorFilterDto } from '../../application/dtos/prescriptor-filter.dto';

export const IPrescriptorRepository = Symbol('IPrescriptorRepository');

export interface IPrescriptorRepository {
  findAll(
    filters: PrescriptorFilterDto,
    take: number,
    skip: number,
  ): Promise<[PrescriptorEntity[], number]>;

  findOne(uuid: string): Promise<PrescriptorEntity | null>;

  findByRegistrationNumberAndAdvice(
    registrationNumber: string,
    adviceId: number,
  ): Promise<PrescriptorEntity | null>;

  create(prescriptor: Partial<PrescriptorEntity>): Promise<PrescriptorEntity>;

  update(prescriptor: PrescriptorEntity): Promise<UpdateResult>;

  softDelete(uuid: string): Promise<UpdateResult>;
}
