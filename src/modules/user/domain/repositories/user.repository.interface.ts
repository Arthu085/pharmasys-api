import { UpdateResult } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserFilterDto } from '../../application/dtos/user-filter.dto';

export const IUserRepository = Symbol('IUserRepository');

export interface IUserRepository {
  findAll(
    filters: UserFilterDto,
    take: number,
    skip: number,
  ): Promise<[UserEntity[], number]>;

  findOne(uuid: string): Promise<UserEntity | null>;

  findByEmail(email: string): Promise<UserEntity | null>;

  findById(id: number): Promise<UserEntity | null>;

  create(user: Partial<UserEntity>): Promise<UserEntity>;

  update(user: UserEntity): Promise<UpdateResult>;

  softDelete(uuid: string): Promise<UpdateResult>;
}
