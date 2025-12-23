import { Module } from '@nestjs/common';
import { BaseDomainService } from './domain/services/base-domain.service';

@Module({
  providers: [BaseDomainService],
  exports: [BaseDomainService],
})
export class SharedModule {}
