import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advice } from './entities/advice.entity';
import { Prescriptor } from './entities/prescriptor.entity';
import { PrescriptorController } from './controllers/prescriptor.controller';
import { PrescriptorService } from './services/prescriptor.service';
import { PrescriptorRepository } from './repositories/prescriptor.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Advice, Prescriptor])],
  controllers: [PrescriptorController],
  providers: [PrescriptorService, PrescriptorRepository],
  exports: [PrescriptorService],
})
export class PrescriptorModule {}
