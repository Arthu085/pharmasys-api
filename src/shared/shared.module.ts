import { Module } from '@nestjs/common';
import { BaseDomainService } from './domain/services/base-domain.service';
import { DataSourceProvider } from '../core/database/providers/data-source.provider';

@Module({
  providers: [BaseDomainService, DataSourceProvider],
  exports: [BaseDomainService, DataSourceProvider],
})
export class SharedModule {}
