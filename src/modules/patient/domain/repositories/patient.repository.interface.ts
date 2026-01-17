import { UpdateResult } from 'typeorm';
import { UUID } from 'crypto';

import { PatientEntity } from '../entities/patient.entity';
import { PatientFilterDto } from '../../application/dtos/patient-filter.dto';

export const IPatientRepository = Symbol('IPatientRepository');

export interface IPatientRepository {
  findAll(
    filters: PatientFilterDto,
    take: number,
    skip: number,
  ): Promise<[PatientEntity[], number]>;

  findOne(uuid: UUID): Promise<PatientEntity | null>;

  findByDocument(document: string): Promise<PatientEntity | null>;

  create(patient: Partial<PatientEntity>): Promise<PatientEntity>;

  update(uuid: UUID, data: Partial<PatientEntity>): Promise<UpdateResult>;

  softDelete(uuid: UUID): Promise<UpdateResult>;
}
