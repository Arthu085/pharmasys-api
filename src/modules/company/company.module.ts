// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { CompanyEntity } from './entities/company.entity';
// import { CompanyTypeEntity } from './entities/company-type.entity';
// import { CompanyRepository } from './repositories/company.repository';
// import { CompanyTypeRepository } from './repositories/company-type.repository';
// import { CompanyService } from './services/company.service';
// import { CompanyController } from './controllers/company.controller';
// // import { UserService } from '../user/domain/services/user-domainOLD.service';
// import { UserRepository } from '../user/infrastructure/repositories/user.repository';
// import { RoleRepository } from '../user/infrastructure/repositories/role.repository';
// import { UserEntity } from '../user/domain/entities/user.entity';
// import { RoleEntity } from '../user/domain/entities/role.entity';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([
//       CompanyEntity,
//       CompanyTypeEntity,
//       UserEntity,
//       RoleEntity,
//     ]),
//   ],
//   controllers: [CompanyController],
//   providers: [
//     CompanyRepository,
//     CompanyTypeRepository,
//     UserRepository,
//     RoleRepository,
//     CompanyService,
//     // UserService,
//   ],
//   exports: [CompanyService],
// })
// export class CompanyModule {}
