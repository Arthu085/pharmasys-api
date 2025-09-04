import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advice } from './entities/advice.entity';
import { Prescriptor } from './entities/prescriptor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Advice, Prescriptor])],
  controllers: [],
  providers: [],
  exports: [],
})
export class PrescriptorModule {}
