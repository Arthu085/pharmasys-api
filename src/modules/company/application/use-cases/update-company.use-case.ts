import { Inject, Injectable } from '@nestjs/common';
import { ICompanyRepository } from '../../domain/repositories/company.repository.interface';
import { CompanyUpdateDto } from '../dtos/company-update.dto';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { FindOneCompanyUseCase } from './find-one-company.use-case';
import { CompanyCnpj } from '../../domain/values-objects/company-cnpj.vo';
import { CompanyAlreadyExistsException } from '../../domain/exceptions/company-already-exists.exception';
import { CompanyName } from '../../domain/values-objects/company-name.vo';
import { CompanyTypeEnum } from '../../domain/enums/company-type.enum';
import { FindOneCompanyTypeUseCase } from './find-one-company-type.use-case';
import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';
import { CompanyDomainService } from '../../domain/services/company-domain.service';
import { StatusEnum } from 'src/shared/enums/status.enum';

@Injectable()
export class UpdateCompanyUseCase {
  constructor(
    @Inject(ICompanyRepository)
    private readonly companyRepository: ICompanyRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOneCompanyUseCase: FindOneCompanyUseCase,
    private readonly findOneCompanyTypeUseCase: FindOneCompanyTypeUseCase,
    private readonly companyDomainService: CompanyDomainService,
  ) {}

  async execute(
    uuid: string,
    dto: CompanyUpdateDto,
    userId: number,
  ): Promise<void> {
    const user = await this.findOneUserUseCase.findById(userId);
    const company = await this.findOneCompanyUseCase.findEntityByUuid(uuid);

    if (dto.cnpj) {
      const cnpj = CompanyCnpj.create(dto.cnpj);
      const currentCnpj = CompanyCnpj.create(company.cnpj);

      if (!cnpj.equals(currentCnpj)) {
        const existingCompany = await this.findOneCompanyUseCase.findByCnpj(
          cnpj.getValue(),
        );

        if (existingCompany && existingCompany.id !== company.id) {
          throw new CompanyAlreadyExistsException();
        }
      }

      company.changeCnpj(cnpj);
    }

    if (dto.name) {
      const name = CompanyName.create(dto.name);
      company.changeName(name);
    }

    if (dto.companyTypes && dto.companyTypes.length > 0) {
      const companyTypeNames = dto.companyTypes.map(
        (key) => CompanyTypeEnum[key],
      );
      const companyTypes =
        await this.findOneCompanyTypeUseCase.findByNames(companyTypeNames);
      company.changeCompanyTypes(companyTypes);
    }

    company.userUpdated = user;

    if (dto.companyTypes && dto.companyTypes.length > 0) {
      await this.companyRepository.updateRelations(company);
    } else {
      await this.companyRepository.update(company);
    }
  }

  async updateStatus(
    uuid: string,
    dto: ChangeStatusDto,
    userId: number,
  ): Promise<void> {
    const user = await this.findOneUserUseCase.findById(userId);
    const company = await this.findOneCompanyUseCase.findEntityByUuid(
      uuid,
      false,
    );

    this.companyDomainService.validateCompanySameStatus(company, dto.status);

    if (dto.status === StatusEnum.ATIVO) {
      company.activate();
    } else {
      company.deactivate();
    }

    company.userUpdated = user;

    delete (company as any).companyTypes;
    await this.companyRepository.update(company);
  }
}
