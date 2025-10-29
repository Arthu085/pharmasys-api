import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrescriptorEntity } from '../entities/prescriptor.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { FilterPrescriptorDto } from '../DTOs/filter.prescriptor.dto';

@Injectable()
export class PrescriptorRepository {
  constructor(
    @InjectRepository(PrescriptorEntity)
    private readonly repo: Repository<PrescriptorEntity>,
  ) {}

  // TODO finalizar findAll
  findAll(
    filters: FilterPrescriptorDto,
    take: number,
    skip: number,
  ): Promise<[PrescriptorEntity[], number]> {
    const where: FindOptionsWhere<PrescriptorEntity> = {};

    return this.repo.findAndCount({ where, take, skip });
  }

  findById(id: number): Promise<PrescriptorEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  findByRegistrationNumber(
    registrationNumber: string,
  ): Promise<PrescriptorEntity | null> {
    return this.repo.findOne({
      where: { registrationNumber: registrationNumber },
    });
  }

  create(prescriptor: Partial<PrescriptorEntity>): PrescriptorEntity {
    return this.repo.create(prescriptor);
  }

  merge(
    prescriptor: PrescriptorEntity,
    dto: DeepPartial<PrescriptorEntity>,
  ): PrescriptorEntity {
    return this.repo.merge(prescriptor, dto);
  }

  save(prescriptor: PrescriptorEntity): Promise<PrescriptorEntity> {
    return this.repo.save(prescriptor);
  }
}
