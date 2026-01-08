import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UUID } from 'crypto';

import { IInventoryExitRepository } from '../../domain/repositories/inventory-exit.repository.interface';
import { InventoryExitDomainService } from '../../domain/services/inventory-exit-domain.service';
import { InventoryExitResponseOneDto } from '../dtos/inventory-exit-response-one.dto';

@Injectable()
export class FindOneInventoryExitUseCase {
  constructor(
    @Inject(IInventoryExitRepository)
    private readonly inventoryExitRepository: IInventoryExitRepository,
    private readonly inventoryExitDomainService: InventoryExitDomainService,
  ) {}

  async execute(uuid: UUID): Promise<InventoryExitResponseOneDto> {
    const inventoryExit = await this.inventoryExitRepository.findOne(uuid);
    this.inventoryExitDomainService.validateInventoryExit(inventoryExit);

    return plainToInstance(InventoryExitResponseOneDto, inventoryExit, {
      excludeExtraneousValues: true,
    });
  }
}
