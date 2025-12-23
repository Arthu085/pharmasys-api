import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from './domain/entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class PatientModule {}
