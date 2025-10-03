import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prescriptor } from '../entities/prescriptor.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { FilterPrescriptorDto } from '../DTOs/filter.prescriptor.dto';

@Injectable()
export class PrescriptorRepository {
  constructor(
    @InjectRepository(Prescriptor)
    private readonly repo: Repository<Prescriptor>,
  ) {}

  findAll(
    filters: FilterPrescriptorDto,
    take: number,
    skip: number,
  ): Promise<[Prescriptor[], number]> {
    const where: FindOptionsWhere<Prescriptor> = {};

    return this.repo.findAndCount({ where, take, skip });
  }

  findById(id: number): Promise<Prescriptor | null> {
    return this.repo.findOne({ where: { id } });
  }

  create(prescriptor: Partial<Prescriptor>): Prescriptor {
    return this.repo.create(prescriptor);
  }

  merge(prescriptor: Prescriptor, dto: DeepPartial<Prescriptor>): Prescriptor {
    return this.repo.merge(prescriptor, dto);
  }

  save(prescriptor: Prescriptor): Promise<Prescriptor> {
    return this.repo.save(prescriptor);
  }
}
