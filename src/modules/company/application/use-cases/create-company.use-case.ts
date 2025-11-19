import { Inject, Injectable } from '@nestjs/common';
import { ICompanyRepository } from '../../domain/repositories/company.repository.interface';
import { CompanyCreateDto } from '../dtos/company-create.dto';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { CompanyName } from '../../domain/values-objects/company-name.vo';
import { CompanyCnpj } from '../../domain/values-objects/company-cnpj.vo';
import { CompanyAlreadyExistsException } from '../../domain/exceptions/company-already-exists.exception';
import { CompanyTypeEnum } from '../../domain/enums/company-type.enum';
import { FindOneCompanyUseCase } from './find-one-company.use-case';
import { FindOneCompanyTypeUseCase } from './find-one-company-type.use-case';

@Injectable()
export class CreateCompanyUseCase {
  constructor(
    @Inject(ICompanyRepository)
    private readonly companyRepository: ICompanyRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOneCompanyUseCase: FindOneCompanyUseCase,
    private readonly findOneCompanyTypeUseCase: FindOneCompanyTypeUseCase,
  ) {}

  async execute(dto: CompanyCreateDto, userId: number): Promise<void> {
    const name = CompanyName.create(dto.name);
    const cnpj = CompanyCnpj.create(dto.cnpj);
    const user = await this.findOneUserUseCase.findById(userId);
    const existingCompany = await this.findOneCompanyUseCase.findByCnpj(
      cnpj.getValue(),
    );

    if (existingCompany) {
      throw new CompanyAlreadyExistsException();
    }

    const companyTypeNames = dto.companyTypes.map(
      (key) => CompanyTypeEnum[key],
    );
    const companyTypes =
      await this.findOneCompanyTypeUseCase.findByNames(companyTypeNames);

    await this.companyRepository.create({
      name: name.getValue(),
      cnpj: cnpj.getValue(),
      companyTypes: companyTypes,
      userCreated: user,
    });
  }
}
