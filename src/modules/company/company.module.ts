import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompanyType } from './entities/company-type.entity';
import { CompanyRepository } from './repositories/company.repository';
import { CompanyTypeRepository } from './repositories/company-type.repository';
import { CompanyService } from './services/company.service';
import { CompanyController } from './controllers/company.controller';
import { UserService } from '../user/services/user.service';
import { UserRepository } from '../user/repositories/user.repository';
import { RoleRepository } from '../user/repositories/role.repository';
import { User } from '../user/entities/user.entity';
import { Role } from '../user/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanyType, User, Role])],
  controllers: [CompanyController],
  providers: [
    CompanyRepository,
    CompanyTypeRepository,
    UserRepository,
    RoleRepository,
    CompanyService,
    UserService,
  ],
  exports: [CompanyService],
})
export class CompanyModule {}
