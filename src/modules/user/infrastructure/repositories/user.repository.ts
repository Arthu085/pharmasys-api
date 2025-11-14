import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository, UpdateResult } from 'typeorm';

import { UserEntity } from '../../domain/entities/user.entity';
import { UserFilterDto } from '../../application/dtos/user-filter.dto';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { StatusEnum } from 'src/shared/enums/status.enum';
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
      const roleName = RoleEnum[filters.role];

      where.role = {
        name: roleName,
      };
    }

    if (filters.status) {
      const status = StatusEnum[filters.status];

      where.status = status;
    }

    return this.repo.findAndCount({
      where,
      relations: ['role'],
      take,
      skip,
      order: { id: 'DESC' },
      withDeleted: false,
    });
  }

  findOne(uuid: string): Promise<UserEntity | null> {
    return this.repo.findOne({
      where: { uuid },
      relations: ['role'],
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

  update(user: UserEntity): Promise<UpdateResult> {
    return this.repo.update({ uuid: user.uuid }, user);
  }

  softDelete(uuid: string): Promise<UpdateResult> {
    return this.repo.softDelete({ uuid });
  }
}
