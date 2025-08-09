import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompanyType } from './entities/company_type.entity';
import { CompanyTypeRel } from './entities/company_type_rel.entity';
import { CompanyController } from './controllers/company.controller';
import { CompanyService } from './services/company.service';
import { CompanyRepository } from './repositories/company.repository';
import { CompanyTypeRepository } from './repositories/company_type.repository';
import { CompanyTypeRelRepository } from './repositories/company_type_rel.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanyType, CompanyTypeRel])],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    CompanyRepository,
    CompanyTypeRepository,
    CompanyTypeRelRepository,
  ],
  exports: [CompanyService],
})
export class CompanyModule {}
