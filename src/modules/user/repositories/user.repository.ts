import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../DTOs/update.user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  findById(id: number): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
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
