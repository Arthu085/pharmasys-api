import { Inject, Injectable } from '@nestjs/common';

import { IEntryItemTypeRepository } from '../../domain/repositories/entry-item-type.repository.interface';
import { EntryItemTypeEntity } from '../../domain/entities/entry-item-type.entity';
import { EntryTypeEnum } from '../../domain/enums/entry-type.enum';
import { InventoryEntryDomainService } from '../../domain/services/inventory-entry-domain.service';

@Injectable()
export class FindOneEntryItemTypeUseCase {
  constructor(
    @Inject(IEntryItemTypeRepository)
    private readonly entryItemTypeRepository: IEntryItemTypeRepository,
    private readonly inventoryEntryDomainService: InventoryEntryDomainService,
  ) {}

  async findByName(name: EntryTypeEnum): Promise<EntryItemTypeEntity> {
    const entryItemType = await this.entryItemTypeRepository.findByName(name);

    return this.inventoryEntryDomainService.validateEntryType(entryItemType);
  }
}
