import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Batch } from './entities/batch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Batch])],
  controllers: [],
  providers: [],
  exports: [],
})
export class BatchModule {}
