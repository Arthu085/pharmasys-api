import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';

import { FindOptionsWhere, ILike, Repository, UpdateResult } from 'typeorm';
import { IPatientRepository } from '../../domain/repositories/patient.repository.interface';
import { PatientFilterDto } from '../../application/dtos/patient-filter.dto';
import { PatientEntity } from '../../domain/entities/patient.entity';

@Injectable()
export class PatientRepository implements IPatientRepository {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly repo: Repository<PatientEntity>,
  ) {}

  findAll(
    filters: PatientFilterDto,
    take: number,
    skip: number,
  ): Promise<[PatientEntity[], number]> {
    const where: FindOptionsWhere<PatientEntity> = {};

    if (filters.name) {
      where.name = ILike(`%${filters.name}%`);
    }

    if (filters.document) {
      where.document = ILike(`%${filters.document}%`);
    }

    if (filters.status) {
      where.status = filters.status;
    }

    return this.repo.findAndCount({
      where,
      take,
      skip,
      order: { id: 'DESC' },
      withDeleted: false,
    });
  }

  findOne(uuid: UUID): Promise<PatientEntity | null> {
    return this.repo.findOne({
      where: { uuid },
      relations: ['userCreated', 'userUpdated'],
      withDeleted: false,
    });
  }

  findByDocument(document: string): Promise<PatientEntity | null> {
    return this.repo.findOne({
      where: { document },
      withDeleted: false,
    });
  }

  create(patient: Partial<PatientEntity>): Promise<PatientEntity> {
    const newPatient = this.repo.create(patient);
    return this.repo.save(newPatient);
  }

  update(uuid: UUID, data: Partial<PatientEntity>): Promise<UpdateResult> {
    return this.repo.update({ uuid }, data);
  }

  softDelete(uuid: UUID): Promise<UpdateResult> {
    return this.repo.softDelete({ uuid });
  }
}
