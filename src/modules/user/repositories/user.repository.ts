import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { FilterUserDto } from '../DTOs/filter.user.dto';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { FilterDto } from 'src/shared/DTOs/filter.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  findAll(
    filters: FilterUserDto & FilterDto,
    take: number,
    skip: number,
  ): Promise<[User[], number]> {
    const where: FindOptionsWhere<User> = {};

    if (filters.name) {
      where.name = ILike(`%${filters.name}%`);
    }

    if (filters.status) {
      where.userStatus = filters.status;
    }

    if (filters.role) {
      const roleName = RoleEnum[filters.role];

      where.role = {
        name: roleName,
      };
    }

    return this.repo.findAndCount({ where, relations: ['role'], take, skip });
  }

  findById(id: number): Promise<User | null> {
    return this.repo.findOne({ where: { id }, relations: ['role'] });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email }, relations: ['role'] });
  }

  findByEmailWithoutRelations(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  create(user: Partial<User>): User {
    return this.repo.create(user);
  }

  merge(user: User, dto: DeepPartial<User>): User {
    return this.repo.merge(user, dto);
  }

  save(user: User): Promise<User> {
    return this.repo.save(user);
  }
}
