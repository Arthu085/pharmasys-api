import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../DTOs/create.user.dto';
import { UpdateUserDto } from '../DTOs/update.user.dto';
import { UserRepository } from '../repositories/user.repository';
import { RoleRepository } from '../repositories/role.repository';
import { Role } from '../entities/role.entity';
import { RoleEnum } from 'src/shared/role.enum';
import * as bcrypt from 'bcrypt';
import { ResponseUserDto } from '../DTOs/response.user.dto';
import { toResponseUserDto } from '../mappers/user.mapper';
import { User } from '../entities/user.entity';
import { ChangeStatusDto } from 'src/shared/change.status.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly logger = new Logger(UserService.name),
  ) {}

  async findAllUsers(): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.findAll();

    return users.map((user) => toResponseUserDto(user));
  }

  async findByIdUser(id: number): Promise<ResponseUserDto> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return toResponseUserDto(user);
  }

  async findByIdForUpdateUser(id: number) {
    const user = await this.userRepository.findByIdForUpdate(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async findByEmailUser(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async findAllRoles(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }

  async createUser(dto: CreateUserDto): Promise<ResponseUserDto> {
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

    try {
      const hashedPasword = await bcrypt.hash(dto.password, 10);

      const newUser = this.userRepository.create({
        ...dto,
        password: hashedPasword,
        role,
      });

      const result = await this.userRepository.save(newUser);

      return toResponseUserDto(result);
    } catch (error) {
      this.logger.error(
        `Falha ao cadastrar usuário. Error: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao cadastrar o usuário.',
      );
    }
  }

  async registerUser(dto: CreateUserDto) {
    const allowedRoles = [RoleEnum.F, RoleEnum.O];

    if (!allowedRoles.includes(dto.role)) {
      throw new BadRequestException(
        'O campo função deve ser farmacêutico ou operador',
      );
    }

    return this.createUser(dto);
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<ResponseUserDto> {
    const user = await this.userRepository.findByIdForUpdate(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // 2. Validações de negócio
    if (dto.email && dto.email !== user.email) {
      const emailExists = await this.userRepository.findByEmail(dto.email);
      if (emailExists && emailExists.id !== id) {
        throw new BadRequestException(
          'Já existe um usuário cadastrado com este e-mail',
        );
      }
    }

    const { role: roleEnum, ...restOfDto } = dto;

    this.userRepository.merge(user, restOfDto);

    if (roleEnum) {
      const roleEntity = await this.roleRepository.findByName(
        roleEnum.toUpperCase(),
      );
      if (!roleEntity) throw new BadRequestException('Função inválida');
      user.role = roleEntity;
    }

    if (dto.password) {
      user.password = await bcrypt.hash(dto.password, 10);
    }

    try {
      const updatedUser = await this.userRepository.save(user);

      return toResponseUserDto(updatedUser);
    } catch (error) {
      this.logger.error(
        `Falha ao atualizar usuário. Error: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao atualizar o usuário.',
      );
    }
  }

  async changeStatusUser(
    id: number,
    dto: ChangeStatusDto,
  ): Promise<ResponseUserDto> {
    const user = await this.userRepository.findByIdForUpdate(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (user.userStatus === dto.status) {
      throw new ConflictException('Não é possível alterar para o mesmo status');
    }

    user.userStatus = dto.status;

    try {
      const result = await this.userRepository.save(user);

      return toResponseUserDto(result);
    } catch (error) {
      this.logger.error(
        `Falha ao alterar o status do usuário ${id}. Error: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao alterar o status do usuário',
      );
    }
  }
}
