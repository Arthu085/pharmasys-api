import {
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
import { createPrescriptorDto } from '../DTOs/create-prescriptor.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { AdviceRepository } from '../repositories/advice.repository';

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
    dto: createPrescriptorDto,
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
        prescriptor.advice === advice
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
}
