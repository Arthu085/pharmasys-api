import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CompanyRepository } from '../repositories/company.repository';
import { CompanyTypeRepository } from '../repositories/company_type.repository';
import { CompanyTypeRelRepository } from '../repositories/company_type_rel.repository';
import { CreateCompanyDto } from '../DTOs/create.company.dto';
import { CompanyTypeEnum } from 'src/common/enums/company_type.enum';
import { CreateCompanyTypeRelDto } from '../DTOs/create.company_type_rel.dto';

@Injectable()
export class CompanyService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly companyTypeRepository: CompanyTypeRepository,
    private readonly companyTypeRelRepository: CompanyTypeRelRepository,
  ) {}

  async createCompany(
    createCompanyDto: CreateCompanyDto,
    createTypeRelDto: CreateCompanyTypeRelDto,
    userId: number,
  ) {
    const existingCnpj = await this.companyRepository.findByCnpj(
      createCompanyDto.cnpj,
    );

    if (existingCnpj) {
      throw new ConflictException('CNPJ já cadastrado');
    }

    const company = this.companyRepository.create({
      name: createCompanyDto.name,
      cnpj: createCompanyDto.cnpj,
      user_id: userId,
    });
    const savedCompany = await this.companyRepository.save(company);

    if (!savedCompany) {
      throw new InternalServerErrorException('Erro ao salvar empresa');
    }

    for (const type of createTypeRelDto.companyTypes) {
      const companyType = await this.companyTypeRepository.findByName(
        CompanyTypeEnum[type],
      );
      if (!companyType) {
        throw new ConflictException(`Tipo de empresa ${type} não encontrado`);
      }

      const companyTypeRel = this.companyTypeRelRepository.create({
        company: savedCompany,
        companyId: savedCompany.id,
        companyType,
        companyTypeId: companyType.id,
      });

      await this.companyTypeRelRepository.save(companyTypeRel);
    }

    return savedCompany;
  }

  async deleteCompany(id: number) {
    await this.companyRepository.delete(id);

    return { message: `Empresa com ID ${id} deletado com sucesso` };
  }

  async findAllCompanies() {
    const companies = await this.companyRepository.findAll();

    if (companies.length === 0) {
      throw new NotFoundException('Nenhuma empresa encontrada');
    }

    return companies;
  }

  async findCompanyById(id: number) {
    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new NotFoundException(`Empresa com ID ${id} não encontrada`);
    }

    return company;
  }
}
