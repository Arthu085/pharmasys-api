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

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    let isChanged = false;

    // Verifica e trata role
    if (dto.role) {
      const role = await this.roleRepository.findOne({
        where: { name: dto.role.toUpperCase() },
      });

      if (!role) {
        throw new BadRequestException('Função inválida');
      }

      if (user.role?.name !== role.name) {
        user.role = role;
        isChanged = true;
      }

      delete dto.role;
    }

    // Verifica e trata password
    if (dto.password) {
      const hashed = await bcrypt.hash(dto.password, 10);
      if (!(await bcrypt.compare(dto.password, user.password))) {
        dto.password = hashed;
        isChanged = true;
      } else {
        delete dto.password; // evita salvar hash igual
      }
    }

    // Verifica e trata status
    if (dto.status) {
      const novoStatus = StatusEnum[dto.status as keyof typeof StatusEnum];
      if (user.status !== novoStatus) {
        user.status = novoStatus;
        isChanged = true;
      }
      delete dto.status;
    }

    // Campos restantes do DTO
    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && (user as any)[key] !== value) {
        (user as any)[key] = value;
        isChanged = true;
      }
    }

    // Se nada mudou, retorna erro
    if (!isChanged) {
      throw new BadRequestException('Nenhuma alteração foi realizada');
    }

    return this.userRepository.save(user);
  }
}
