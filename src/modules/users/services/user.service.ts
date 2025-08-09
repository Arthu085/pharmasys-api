import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../DTOs/create.user.dto';

import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../DTOs/update.user.dto';
import { StatusEnum } from 'src/common/enums/status.enum';
import { RoleEnum } from 'src/common/enums/role.enum';
import { UserRepository } from '../repositories/user.repository';
import { RoleRepository } from '../repositories/role.repository';
import { ResponseUserDto } from '../DTOs/response.user.dto';
import { toResponseUserDto } from '../mappers/user.mapper';
import { Role } from '../entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,

    private readonly roleRepository: RoleRepository,
  ) {}

  async create(dto: CreateUserDto): Promise<ResponseUserDto> {
    const existingUser = await this.userRepository.findByEmailWithoutRelations(
      dto.email,
    );

    if (existingUser) {
      throw new BadRequestException(
        'Já existe um usuário cadastrado com este e-mail',
      );
    }

    const role = await this.roleRepository.findByName(dto.role.toUpperCase());

    if (!role) {
      throw new BadRequestException('Função inválida');
    }

    const hashedPasword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepository.createUser({
      ...dto,
      password: hashedPasword,
      role,
    });

    const createdUser = await this.userRepository.save(user);

    return toResponseUserDto(createdUser);
  }

  async register(dto: CreateUserDto): Promise<ResponseUserDto> {
    const allowedRoles = [RoleEnum.FARMACEUTICO, RoleEnum.OPERADOR];

    if (!allowedRoles.includes(dto.role)) {
      throw new BadRequestException(
        'O campo função deve ser FARMACEUTICO ou OPERADOR',
      );
    }

    return this.create(dto);
  }

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(toResponseUserDto);
  }

  async findOne(id: number): Promise<ResponseUserDto> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return toResponseUserDto(user);
  }

  async findOneForUpdate(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);

    return user;
  }

  async update(id: number, dto: UpdateUserDto): Promise<ResponseUserDto> {
    const user = await this.findOneForUpdate(id);

    let isChanged = false;

    // Verifica se e-mail já existe para outro usuário
    if (dto.email && dto.email !== user.email) {
      const emailExists = await this.userRepository.findByEmail(dto.email);

      if (emailExists) {
        throw new BadRequestException(
          'Já existe um usuário cadastrado com este e-mail',
        );
      }

      user.email = dto.email;
      isChanged = true;
    }

    // Verifica e trata role
    if (dto.role) {
      const role = await this.roleRepository.findByName(dto.role.toUpperCase());

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
      const novoStatus = StatusEnum[dto.status as StatusEnum];
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

    const updatedUser = await this.userRepository.save(user);

    return toResponseUserDto(updatedUser);
  }

  async findAllRoles(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }
}
