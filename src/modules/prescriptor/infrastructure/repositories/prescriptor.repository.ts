import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';

import { PrescriptorEntity } from '../../domain/entities/prescriptor.entity';
import { FindOptionsWhere, ILike, Repository, UpdateResult } from 'typeorm';
import { PrescriptorFilterDto } from '../../application/dtos/prescriptor-filter.dto';
import { AdviceEnum } from '../../domain/enums/advice.enum';
import { UfEnum } from '../../domain/enums/uf.enum';
import { IPrescriptorRepository } from '../../domain/repositories/prescriptor.repository.interface';

@Injectable()
export class PrescriptorRepository implements IPrescriptorRepository {
  constructor(
    @InjectRepository(PrescriptorEntity)
    private readonly repo: Repository<PrescriptorEntity>,
  ) {}

  findAll(
    filters: PrescriptorFilterDto,
    take: number,
    skip: number,
  ): Promise<[PrescriptorEntity[], number]> {
    const where: FindOptionsWhere<PrescriptorEntity> = {};

    if (filters.name) {
      where.name = ILike(`%${filters.name}%`);
    }

    if (filters.registrationNumber) {
      where.registrationNumber = ILike(`%${filters.registrationNumber}%`);
    }

    if (filters.advice) {
      const adviceAcronym = AdviceEnum[filters.advice];

      where.advice = {
        acronym: adviceAcronym,
      };
    }

    if (filters.state) {
      const state = UfEnum[filters.state];

      where.state = state;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    return this.repo.findAndCount({
      where,
      relations: ['advice'],
      take,
      skip,
      order: { id: 'DESC' },
      withDeleted: false,
    });
  }

  findOne(uuid: UUID): Promise<PrescriptorEntity | null> {
    return this.repo.findOne({
      where: { uuid },
      relations: ['advice', 'userCreated', 'userUpdated'],
      withDeleted: false,
    });
  }

  findByRegistrationNumberAndAdvice(
    registrationNumber: string,
    adviceId: number,
  ): Promise<PrescriptorEntity | null> {
    return this.repo.findOne({
      where: {
        registrationNumber: registrationNumber,
        advice: { id: adviceId },
      },
      relations: ['advice'],
      withDeleted: false,
    });
  }

  create(prescriptor: Partial<PrescriptorEntity>): Promise<PrescriptorEntity> {
    const newPrescriptor = this.repo.create(prescriptor);
    return this.repo.save(newPrescriptor);
  }

  update(uuid: UUID, data: Partial<PrescriptorEntity>): Promise<UpdateResult> {
    return this.repo.update({ uuid }, data);
  }

  softDelete(uuid: UUID): Promise<UpdateResult> {
    return this.repo.softDelete({ uuid });
  }
}
