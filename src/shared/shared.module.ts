import { Module } from '@nestjs/common';
import { BaseDomainService } from './domain/services/base-domain.service';
import { DataSourceProvider } from '../core/database/providers/data-source.provider';
import { IEntityUsageChecker } from './interfaces/entity-usage-checker.service.interface';
import { EntityUsageCheckerService } from './domain/services/entity-usage-checker.service';

@Module({
  providers: [
    BaseDomainService,
    DataSourceProvider,
    {
      provide: IEntityUsageChecker,
      useClass: EntityUsageCheckerService,
    },
  ],
  exports: [BaseDomainService, DataSourceProvider, IEntityUsageChecker],
})
export class SharedModule {}
