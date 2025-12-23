import { Inject, Injectable } from '@nestjs/common';
import { ICompanyRepository } from '../../domain/repositories/company.repository.interface';
import { CompanyCreateDto } from '../dtos/company-create.dto';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { CompanyName } from '../../domain/values-objects/company-name.vo';
import { CompanyCnpj } from '../../domain/values-objects/company-cnpj.vo';
import { FindOneCompanyUseCase } from './find-one-company.use-case';
import { FindOneCompanyTypeUseCase } from './find-one-company-type.use-case';
import { CompanyDomainService } from '../../domain/services/company-domain.service';

@Injectable()
export class CreateCompanyUseCase {
  constructor(
    @Inject(ICompanyRepository)
    private readonly companyRepository: ICompanyRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOneCompanyUseCase: FindOneCompanyUseCase,
    private readonly findOneCompanyTypeUseCase: FindOneCompanyTypeUseCase,
    private readonly companyDomainService: CompanyDomainService,
  ) {}

  async execute(dto: CompanyCreateDto, userId: number): Promise<void> {
    const binds = {
      name: CompanyName.create(dto.name),
      cnpj: CompanyCnpj.create(dto.cnpj),
      companyTypes: await this.findOneCompanyTypeUseCase.findByNames(
        dto.companyTypes,
      ),
    };

    const userCreating = await this.findOneUserUseCase.findById(userId);
    const existingCompany = await this.findOneCompanyUseCase.findByCnpj(
      binds.cnpj.getValue(),
    );

    this.companyDomainService.validateCompanyExistsCreate(existingCompany);

    await this.companyRepository.create({
      name: binds.name.getValue(),
      cnpj: binds.cnpj.getValue(),
      companyTypes: binds.companyTypes,
      userCreated: userCreating,
    });
  }
}
