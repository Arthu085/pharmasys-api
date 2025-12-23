import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository, UpdateResult } from 'typeorm';
import { UUID } from 'crypto';

import { UserEntity } from '../../domain/entities/user.entity';
import { UserFilterDto } from '../../application/dtos/user-filter.dto';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  findAll(
    filters: UserFilterDto,
    take: number,
    skip: number,
  ): Promise<[UserEntity[], number]> {
    const where: FindOptionsWhere<UserEntity> = {};

    if (filters.name) {
      where.name = ILike(`%${filters.name}%`);
    }

    if (filters.role) {
      where.role = {
        name: filters.role,
      };
    }

    if (filters.status) {
      where.status = filters.status;
    }

    return this.repo.findAndCount({
      where,
      relations: ['role', 'userCreated', 'userUpdated'],
      take,
      skip,
      order: { id: 'DESC' },
      withDeleted: false,
    });
  }

  findOne(uuid: UUID): Promise<UserEntity | null> {
    return this.repo.findOne({
      where: { uuid },
      relations: ['role', 'userCreated', 'userUpdated'],
      withDeleted: false,
    });
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.repo.findOne({
      where: { email },
      relations: ['role'],
      withDeleted: false,
    });
  }

  findById(id: number): Promise<UserEntity | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['role'],
      withDeleted: false,
    });
  }

  create(user: Partial<UserEntity>): Promise<UserEntity> {
    const newUser = this.repo.create(user);
    return this.repo.save(newUser);
  }

  update(uuid: UUID, data: Partial<UserEntity>): Promise<UpdateResult> {
    return this.repo.update({ uuid }, data);
  }

  softDelete(uuid: UUID): Promise<UpdateResult> {
    return this.repo.softDelete({ uuid });
  }
}
