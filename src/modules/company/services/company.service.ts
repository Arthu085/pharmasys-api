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

@Injectable()
export class CompanyService {
  private readonly logger = new Logger(CompanyService.name);

  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly companyTypeRepository: CompanyTypeRepository,
    private readonly userService: UserService,
  ) {}

  async findAllCompanies(): Promise<ResponseCompanyDto[]> {
    const companies = await this.companyRepository.findAll();

    return companies.map((company) => toResponseCompanyDto(company));
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
}
