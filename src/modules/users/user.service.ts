import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../roles/entities/role.entity';
import { CreateUserDto } from './DTOs/create.user.dto';

import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './DTOs/update.user.dto';
import { StatusEnum } from 'src/common/enums/status.enum';

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
      where: { name: dto.role.toUpperCase() },
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

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (dto.role) {
      const role = await this.roleRepository.findOne({
        where: { name: dto.role.toLocaleUpperCase() },
      });

      if (!role) {
        throw new BadRequestException('Função inválida');
      }

      user.role = role;

      delete dto.role;
    }

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    if (dto.status) {
      user.status = StatusEnum[dto.status as keyof typeof StatusEnum];
      delete dto.status;
    }

    Object.assign(user, dto);

    return this.userRepository.save(user);
  }
}
