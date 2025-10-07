import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrescriptorRepository } from '../repositories/prescriptor.repository';
import { FilterPrescriptorDto } from '../DTOs/filter.prescriptor.dto';
import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { ResponsePrescriptorDto } from '../DTOs/response.prescriptor.dto';
import { toResponsePrescriptorDto } from '../mappers/prescriptor.mapper';
import { UserService } from 'src/modules/user/services/user.service';
import { AdviceRepository } from '../repositories/advice.repository';
import { CreatePrescriptorDto } from '../DTOs/create.prescriptor.dto';
import { UpdatePrescriptorDto } from '../DTOs/update.prescriptor.dto';
import { StatusEnum } from 'src/shared/enums/status.enum';

@Injectable()
export class PrescriptorService {
  private readonly logger = new Logger(PrescriptorService.name);

  constructor(
    private readonly prescriptorRepository: PrescriptorRepository,
    private readonly userService: UserService,
    private readonly adviceRepository: AdviceRepository,
  ) {}

  async findAllPrescriptors(
    filters: FilterPrescriptorDto,
  ): Promise<IPaginatedResponse<ResponsePrescriptorDto>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;
    const [prescriptors, total] = await this.prescriptorRepository.findAll(
      filters,
      limit,
      skip,
    );
    const data = prescriptors.map((user) => toResponsePrescriptorDto(user));
    const lastPage = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        lastPage,
      },
    };
  }

  async findByIdPrescriptor(
    id: number,
  ): Promise<ResponsePrescriptorDto | null> {
    const prescriptor = await this.prescriptorRepository.findById(id);

    if (!prescriptor) {
      throw new NotFoundException('Prescritor não encontrado');
    }

    return toResponsePrescriptorDto(prescriptor);
  }

  async createPrescriptor(
    dto: CreatePrescriptorDto,
    userId: number,
  ): Promise<ResponsePrescriptorDto> {
    const user = await this.userService.findByIdShared(userId);
    const prescriptor =
      await this.prescriptorRepository.findByRegistrationNumber(
        dto.registrationNumber,
      );
    const advice = await this.adviceRepository.findByAcronym(dto.advice);

    if (!advice) {
      throw new NotFoundException('Conselho não encontrado');
    }

    if (prescriptor) {
      if (
        prescriptor.registrationNumber === dto.registrationNumber &&
        prescriptor.advice.acronym === advice.acronym
      ) {
        throw new ConflictException(
          'Já existe um prescritor com o mesmo número de registro e conselho',
        );
      }
    }

    try {
      const prescriptor = await this.prescriptorRepository.create({
        ...dto,
        advice,
        userCreated: user,
      });

      const result = await this.prescriptorRepository.save(prescriptor);

      return toResponsePrescriptorDto(result);
    } catch (error) {
      this.logger.error(
        `Falha ao cadastrar prescritor. Error: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao cadastrar o prescritor',
      );
    }
  }

  async updatePrescriptor(
    id: number,
    dto: UpdatePrescriptorDto,
    userId: number,
  ): Promise<ResponsePrescriptorDto> {
    const user = await this.userService.findByIdShared(userId);
    const prescriptor = await this.prescriptorRepository.findById(id);

    if (!prescriptor) {
      throw new NotFoundException('Prescritor não encontrado');
    }

    if (prescriptor.status === StatusEnum.INATIVO) {
      throw new BadRequestException(
        'Não é possível alterar um prescritor inativo',
      );
    }

    if (dto.advice) {
      const advice = await this.adviceRepository.findByAcronym(dto.advice);

      if (!advice) {
        throw new NotFoundException('Conselho não encontrado');
      }
    }

    // TODO finalizar após a refatoração do código

    // if (dto.registrationNumber) {
    //   const prescriptorByRegistrationNumber =
    //     await this.prescriptorRepository.findByRegistrationNumber(
    //       dto.registrationNumber,
    //     );

    //   if (
    //     prescriptorByRegistrationNumber &&
    //     prescriptorByRegistrationNumber.id !== id
    //   ) {
    //     if (dto.advice === prescriptorByRegistrationNumber.advice) {
    //       throw new ConflictException(
    //         'Já existe um prescritor com o mesmo número de registro e conselho',
    //       );
    //     }
    //   }
    // }

    const { advice: advice, ...restOfDto } = dto;

    Object.assign(prescriptor, restOfDto);

    prescriptor.userUpdated = user;

    try {
      const result = await this.prescriptorRepository.save(prescriptor);

      return toResponsePrescriptorDto(result);
    } catch (error) {
      this.logger.error(
        `Falha ao atualizar prescritor. Error: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao atualizar o prescritor',
      );
    }
  }
}
