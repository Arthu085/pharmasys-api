import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './domain/entities/company.entity';
import { CompanyTypeEntity } from './domain/entities/company-type.entity';
import { ICompanyRepository } from './domain/repositories/company.repository.interface';
import { ICompanyTypeRepository } from './domain/repositories/company-type.repository.interface';
import { CompanyRepository } from './infrastructure/repositories/company.repository';
import { CompanyTypeRepository } from './infrastructure/repositories/company-type.repository';
import { CompanyProtectedController } from './infrastructure/controllers/company-protected.controller';
import { CompanyPublicController } from './infrastructure/controllers/company-public.controller';
import { CompanyDomainService } from './domain/services/company-domain.service';
import { CreateCompanyUseCase } from './application/use-cases/create-company.use-case';
import { UpdateCompanyUseCase } from './application/use-cases/update-company.use-case';
import { FindOneCompanyUseCase } from './application/use-cases/find-one-company.use-case';
import { FindAllCompanyUseCase } from './application/use-cases/find-all-company.use-case';
import { DeleteCompanyUseCase } from './application/use-cases/delete-company.use-case';
import { FindOneCompanyTypeUseCase } from './application/use-cases/find-one-company-type.use-case';
import { UserModule } from '../user/user.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEntity, CompanyTypeEntity]),
    UserModule,
    SharedModule,
  ],
  controllers: [CompanyProtectedController, CompanyPublicController],
  providers: [
    {
      provide: ICompanyRepository,
      useClass: CompanyRepository,
    },
    {
      provide: ICompanyTypeRepository,
      useClass: CompanyTypeRepository,
    },
    CompanyDomainService,
    CreateCompanyUseCase,
    UpdateCompanyUseCase,
    FindOneCompanyUseCase,
    FindAllCompanyUseCase,
    DeleteCompanyUseCase,
    FindOneCompanyTypeUseCase,
  ],
  exports: [FindOneCompanyUseCase],
})
export class CompanyModule {}
