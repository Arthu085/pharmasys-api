import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeEntity } from '../entities/type.entity';

@Injectable()
export class TypeRepository {
  constructor(
    @InjectRepository(TypeEntity)
    private readonly repo: Repository<TypeEntity>,
  ) {}

  findByName(name: string): Promise<TypeEntity | null> {
    return this.repo.findOne({ where: { name } });
  }
}
