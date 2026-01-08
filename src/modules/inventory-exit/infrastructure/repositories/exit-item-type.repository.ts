import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IExitItemTypeRepository } from '../../domain/repositories/exit-item-type.repository.interface';
import { ExitItemTypeEntity } from '../../domain/entities/exit-item-type.entity';
import { ExitTypeEnum } from '../../domain/enums/exit-type.enum';

@Injectable()
export class ExitItemTypeRepository implements IExitItemTypeRepository {
  constructor(
    @InjectRepository(ExitItemTypeEntity)
    private readonly repo: Repository<ExitItemTypeEntity>,
  ) {}

  findByName(name: ExitTypeEnum): Promise<ExitItemTypeEntity | null> {
    return this.repo.findOne({ where: { name: name } });
  }
}
