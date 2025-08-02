import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../users/entities/role.entity';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly repo: Repository<Role>,
  ) {}

  findByName(name: string): Promise<Role | null> {
    return this.repo.findOne({ where: { name } });
  }
}
