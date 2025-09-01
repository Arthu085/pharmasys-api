import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompanyType } from './entities/company-type.entity';
import { User } from '../user/entities/user.entity';
import { Role } from '../user/entities/role.entity';
import { CompanyRepository } from './repositories/company.repository';
import { CompanyTypeRepository } from './repositories/company-type.repository';
import { CompanyService } from './services/company.service';
import { UserService } from '../user/services/user.service';
import { CompanyController } from './controllers/company.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanyType])],
  controllers: [CompanyController],
  providers: [CompanyRepository, CompanyTypeRepository, CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
