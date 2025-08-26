import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from '../entities/type.entity';

@Injectable()
export class TypeRepository {
  constructor(
    @InjectRepository(Type)
    private readonly repo: Repository<Type>,
  ) {}

  findByName(name: string): Promise<Type | null> {
    return this.repo.findOne({ where: { name } });
  }
}
