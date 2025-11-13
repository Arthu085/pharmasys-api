import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdviceEntity } from './domain/entities/advice.entity';
import { PrescriptorEntity } from './domain/entities/prescriptor.entity';
import { PrescriptorProtectedController } from './infraestructure/controllers/prescriptor-protected.controller';
import { PrescriptorPublicController } from './infraestructure/controllers/prescriptor-public.controller';
import { PrescriptorRepository } from './infraestructure/repositories/prescriptor.repository';
import { AdviceRepository } from './infraestructure/repositories/advice.repository';
import { PrescriptorDomainService } from './domain/services/prescriptor-domain.service';
import { CreatePrescriptorUseCase } from './application/use-cases/create-prescriptor.use-case';
import { UpdatePrescriptorUseCase } from './application/use-cases/update-prescriptor.use-case';
import { FindOnePrescriptorUseCase } from './application/use-cases/find-one-prescriptor.use-case';
import { FindAllPrescriptorUseCase } from './application/use-cases/find-all-prescriptor.use-case';
import { DeletePrescriptorUseCase } from './application/use-cases/delete-prescriptor.use-case';
import { FindOneAdviceUseCase } from './application/use-cases/find-one-advice.use-case';
import { UserModule } from '../user/user.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdviceEntity, PrescriptorEntity]),
    UserModule,
    SharedModule,
  ],
  controllers: [PrescriptorProtectedController, PrescriptorPublicController],
  providers: [
    PrescriptorRepository,
    AdviceRepository,
    PrescriptorDomainService,
    CreatePrescriptorUseCase,
    UpdatePrescriptorUseCase,
    FindOnePrescriptorUseCase,
    FindAllPrescriptorUseCase,
    DeletePrescriptorUseCase,
    FindOneAdviceUseCase,
  ],
  exports: [FindOnePrescriptorUseCase],
})
export class PrescriptorModule {}
