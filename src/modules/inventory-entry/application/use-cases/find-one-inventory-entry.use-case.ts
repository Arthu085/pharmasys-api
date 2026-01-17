import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UUID } from 'crypto';

import { IInventoryEntryRepository } from '../../domain/repositories/inventory-entry.repository.interface';
import { InventoryEntryDomainService } from '../../domain/services/inventory-entry-domain.service';
import { InventoryEntryResponseOneDto } from '../dtos/inventory-entry-response-one.dto';

@Injectable()
export class FindOneInventoryEntryUseCase {
  constructor(
    @Inject(IInventoryEntryRepository)
    private readonly inventoryEntryRepository: IInventoryEntryRepository,
    private readonly inventoryEntryDomainService: InventoryEntryDomainService,
  ) {}

  async execute(uuid: UUID): Promise<InventoryEntryResponseOneDto> {
    const inventoryEntry = await this.inventoryEntryRepository.findOne(uuid);
    this.inventoryEntryDomainService.validateInventoryEntry(inventoryEntry);

    return plainToInstance(InventoryEntryResponseOneDto, inventoryEntry, {
      excludeExtraneousValues: true,
    });
  }
}
