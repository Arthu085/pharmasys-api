import { Inject, Injectable } from '@nestjs/common';

import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { IBatchRepository } from '../../domain/repositories/batch.repository.interface';
import { FindOneBatchUseCase } from './find-one-batch.use-case';
import { BatchDomainService } from '../../domain/services/batch-domain.service';
import { BatchCreateDto } from '../dtos/batch-create.dto';
import { BatchCode } from '../../domain/values-objects/batch-code.vo';
import { FindOneCompanyUseCase } from 'src/modules/company/application/use-cases/find-one-company.use-case';

@Injectable()
export class CreateBatchUseCase {
  constructor(
    @Inject(IBatchRepository)
    private readonly batchRepository: IBatchRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOneBatchUseCase: FindOneBatchUseCase,
    private readonly findOneCompanyUseCase: FindOneCompanyUseCase,
    private readonly batchDomainService: BatchDomainService,
  ) {}

  async execute(dto: BatchCreateDto, userId: number): Promise<void> {
    const binds = {
      userCreated: await this.findOneUserUseCase.findById(userId),
      batchCode: BatchCode.create(dto.batchCode),
      company: await this.findOneCompanyUseCase.findEntityByUuid(dto.company),
      expirationDate: dto.expirationDate,
    };

    const existingBatch = await this.findOneBatchUseCase.findByCode(
      binds.batchCode.getValue(),
    );

    this.batchDomainService.validateBatchExistsCreate(existingBatch);

    await this.batchRepository.create({
      ...binds,
      batchCode: binds.batchCode.getValue(),
    });
  }
}
