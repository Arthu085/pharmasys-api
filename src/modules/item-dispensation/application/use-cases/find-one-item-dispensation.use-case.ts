import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UUID } from 'crypto';

import { IItemDispensationRepository } from '../../domain/repositories/item-dispensation.repository.interface';
import { ItemDispensationResponseOneDto } from '../dtos/item-dispensation-response-one.dto';
import { ItemDispensationDomainService } from '../../domain/services/item-dispensation-domain.service';

@Injectable()
export class FindOneItemDispensationUseCase {
  constructor(
    @Inject(IItemDispensationRepository)
    private readonly itemDispensationRepository: IItemDispensationRepository,
    private readonly itemDispensationDomainService: ItemDispensationDomainService,
  ) {}

  async execute(uuid: UUID): Promise<ItemDispensationResponseOneDto> {
    const itemDispensation =
      await this.itemDispensationRepository.findOne(uuid);
    this.itemDispensationDomainService.validateItemDispensation(
      itemDispensation,
    );

    return plainToInstance(ItemDispensationResponseOneDto, itemDispensation, {
      excludeExtraneousValues: true,
    });
  }
}
