import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CompanyRepository } from '../repositories/company.repository';
import { CompanyTypeRepository } from '../repositories/company-type.repository';
import { ResponseCompanyDto } from '../DTOs/response.company.dto';
import { toResponseCompanyDto } from '../mappers/company.mapper';
import { CreateCompanyDto } from '../DTOs/create.company.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { CompanyTypeEnum } from '../enums/company-type.enum';
import { UpdateCompanyDto } from '../DTOs/update.company.dto';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { ChangeStatusDto } from 'src/shared/DTOs/change-status.dto';
import { FilterCompanyDto } from '../DTOs/filter.company.dto';
import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';

@Injectable()
export class CompanyService {
  private readonly logger = new Logger(CompanyService.name);

  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly companyTypeRepository: CompanyTypeRepository,
    private readonly userService: UserService,
  ) {}

  async findAllCompanies(
    filters: FilterCompanyDto,
  ): Promise<IPaginatedResponse<ResponseCompanyDto>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;
    const [companies, total] = await this.companyRepository.findAll(
      filters,
      limit,
      skip,
    );
    const data = companies.map((user) => toResponseCompanyDto(user));
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

  async findByIdCompany(id: number): Promise<ResponseCompanyDto | null> {
    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    return toResponseCompanyDto(company);
  }

  async createCompany(
    dto: CreateCompanyDto,
    userId: number,
  ): Promise<ResponseCompanyDto> {
    const user = await this.userService.findByIdShared(userId);
    const existingCompany = await this.companyRepository.findByCnpj(dto.cnpj);

    if (existingCompany) {
      throw new ConflictException('Existe uma empresa com esse CNPJ');
    }

    const companyTypeNames = dto.companyTypes.map(
      (key) => CompanyTypeEnum[key],
    );
    const companyTypes =
      await this.companyTypeRepository.findByNames(companyTypeNames);

    if (companyTypes.length === 0) {
      throw new BadRequestException('Tipo de empresa não encontrado');
    }

    try {
      const company = this.companyRepository.create({
        name: dto.name,
        cnpj: dto.cnpj,
        companyTypes: companyTypes,
        userCreated: user,
      });

      const result = await this.companyRepository.save(company);

      return toResponseCompanyDto(result);
    } catch (error) {
      this.logger.error(
        `Falha ao cadastrar empresa. Error: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao cadastrar a empresa',
      );
    }
  }

  async updateCompany(
    id: number,
    dto: UpdateCompanyDto,
    userId: number,
  ): Promise<ResponseCompanyDto> {
    const user = await this.userService.findByIdShared(userId);
    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    if (company.status === StatusEnum.I) {
      throw new BadRequestException(
        'Não é possível alterar uma empresa inativa',
      );
    }

    const { cnpj: cnpjDto, companyTypes: companyTypesDto, ...restOfDto } = dto;

    Object.assign(company, restOfDto);

    if (cnpjDto) {
      const existingCompany = await this.companyRepository.findByCnpj(cnpjDto);

      if (existingCompany && existingCompany.id !== id) {
        throw new ConflictException('Existe uma empresa com esse CNPJ');
      }
      company.cnpj = cnpjDto;
    }

    if (companyTypesDto) {
      const newTypeNames = companyTypesDto.map((key) => CompanyTypeEnum[key]);

      const existingTypeNames = company.companyTypes.map((type) => type.name);

      const areTypesTheSame =
        newTypeNames.length === existingTypeNames.length &&
        newTypeNames.every((typeName) => existingTypeNames.includes(typeName));

      if (areTypesTheSame) {
        throw new BadRequestException(
          'Não é possível alterar os tipos de empresa para os mesmos tipos já existentes',
        );
      }

      const companyTypes =
        await this.companyTypeRepository.findByNames(newTypeNames);

      if (companyTypes.length === 0) {
        throw new BadRequestException('Tipo de empresa não encontrado');
      }

      company.companyTypes = companyTypes;
    }

    company.userUpdated = user;

    try {
      const result = await this.companyRepository.save(company);

      return toResponseCompanyDto(result);
    } catch (error) {
      this.logger.error(
        `Falha ao atualizar empresa. Error: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao atualizar a empresa',
      );
    }
  }

  async changeStatusCompany(
    id: number,
    dto: ChangeStatusDto,
    userId: number,
  ): Promise<ResponseCompanyDto> {
    const user = await this.userService.findByIdShared(userId);
    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    if (company.status === dto.status) {
      throw new ConflictException(
        'O status da empresa já está definido como o status fornecido',
      );
    }

    company.status = dto.status;
    company.userUpdated = user;

    try {
      const result = await this.companyRepository.save(company);

      return toResponseCompanyDto(result);
    } catch (error) {
      this.logger.error(
        `Falha ao alterar o status da empresa ${id}. Error: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao alterar o status da empresa',
      );
    }
  }
}
