import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeEntity } from '../../domain/entities/type.entity';
import { TypeEnum } from '../../domain/enums/type.enum';

@Injectable()
export class TypeRepository {
  constructor(
    @InjectRepository(TypeEntity)
    private readonly repo: Repository<TypeEntity>,
  ) {}

  findByName(name: TypeEnum): Promise<TypeEntity | null> {
    return this.repo.findOne({ where: { name } });
  }
}
