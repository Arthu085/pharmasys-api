import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IPatientRepository } from './domain/repositories/patient.repository.interface';
import { PatientEntity } from './domain/entities/patient.entity';
import { PatientRepository } from './infrastructure/repositories/patient.repository';
import { PatientDomainService } from './domain/services/patient-domain.service';
import { CreatePatientUseCase } from './application/use-cases/create-patient.use-case';
import { UpdatePatientUseCase } from './application/use-cases/update-patient.use-case';
import { FindOnePatientUseCase } from './application/use-cases/find-one-patient.use-case';
import { FindAllPatientUseCase } from './application/use-cases/find-all-patient.use-case';
import { DeletePatientUseCase } from './application/use-cases/delete-patient.use-case';
import { UserModule } from '../user/user.module';
import { SharedModule } from 'src/shared/shared.module';
import { PatientProtectedController } from './infrastructure/controllers/patient-protected.controller';
import { PatientPublicController } from './infrastructure/controllers/patient-public.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientEntity]),
    UserModule,
    SharedModule,
  ],
  controllers: [PatientProtectedController, PatientPublicController],
  providers: [
    {
      provide: IPatientRepository,
      useClass: PatientRepository,
    },
    PatientDomainService,
    CreatePatientUseCase,
    UpdatePatientUseCase,
    FindOnePatientUseCase,
    FindAllPatientUseCase,
    DeletePatientUseCase,
  ],
  exports: [FindOnePatientUseCase],
})
export class PatientModule {}
