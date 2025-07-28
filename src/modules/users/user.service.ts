import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../roles/entities/role.entity';
import { CreateUserDto } from './DTOs/create.user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const role = await this.roleRepository.findOne({
      where: { name: dto.role },
    });

    if (!role) {
      throw new BadRequestException('Função inválida');
    }

    const hashedPasword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepository.create({
      ...dto,
      password: hashedPasword,
      role,
    });

    return this.userRepository.save(user);
  }
}
