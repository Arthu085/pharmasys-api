import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { FilterUserDto } from '../DTOs/filter.user.dto';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { StatusEnum } from 'src/shared/enums/status.enum';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  findAll(
    filters: FilterUserDto,
    take: number,
    skip: number,
  ): Promise<[UserEntity[], number]> {
    const where: FindOptionsWhere<UserEntity> = {};

    if (filters.name) {
      where.name = ILike(`%${filters.name}%`);
    }

    if (filters.status) {
      const status = StatusEnum[filters.status];
      where.status = status;
    }

    if (filters.role) {
      const roleName = RoleEnum[filters.role];

      where.role = {
        name: roleName,
      };
    }

    return this.repo.findAndCount({ where, relations: ['role'], take, skip });
  }

  findById(id: number): Promise<UserEntity | null> {
    return this.repo.findOne({ where: { id }, relations: ['role'] });
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.repo.findOne({ where: { email }, relations: ['role'] });
  }

  findByEmailWithoutRelations(email: string): Promise<UserEntity | null> {
    return this.repo.findOne({ where: { email } });
  }

  create(user: Partial<UserEntity>): UserEntity {
    return this.repo.create(user);
  }

  merge(user: UserEntity, dto: DeepPartial<UserEntity>): UserEntity {
    return this.repo.merge(user, dto);
  }

  save(user: UserEntity): Promise<UserEntity> {
    return this.repo.save(user);
  }
}
