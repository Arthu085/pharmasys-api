// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AdviceEntity } from './entities/advice.entity';
// import { PrescriptorEntity } from './entities/prescriptor.entity';
// import { PrescriptorController } from './controllers/prescriptor.controller';
// import { PrescriptorService } from './services/prescriptor.service';
// import { PrescriptorRepository } from './repositories/prescriptor.repository';
// import { UserService } from '../user/domain/services/user-domainOLD.service';
// import { RoleEntity } from '../user/domain/entities/role.entity';
// import { UserEntity } from '../user/domain/entities/user.entity';
// import { UserRepository } from '../user/infrastructure/repositories/user.repository';
// import { RoleRepository } from '../user/infrastructure/repositories/role.repository';
// import { AdviceRepository } from './repositories/advice.repository';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([
//       AdviceEntity,
//       PrescriptorEntity,
//       UserEntity,
//       RoleEntity,
//     ]),
//   ],
//   controllers: [PrescriptorController],
//   providers: [
//     PrescriptorService,
//     PrescriptorRepository,
//     UserService,
//     UserRepository,
//     RoleRepository,
//     AdviceRepository,
//   ],
//   exports: [PrescriptorService],
// })
// export class PrescriptorModule {}
