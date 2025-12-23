import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BatchEntity } from './domain/entities/batch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BatchEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class BatchModule {}
