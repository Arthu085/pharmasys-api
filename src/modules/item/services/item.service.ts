import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ItemRepository } from '../repositories/item.repository';
import { DosageRepository } from '../repositories/dosage.repository';
import { PresentationRepository } from '../repositories/presentation.repository';
import { SubtypeRepository } from '../repositories/subtype.repository';
import { TypeRepository } from '../repositories/type.repository';
import { ResponseItemDto } from '../DTOs/response.item.dto';
import { toResponseItemDto } from '../mappers/item.mapper';

@Injectable()
export class ItemService {
  private readonly logger = new Logger(ItemService.name);

  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly dosageRepository: DosageRepository,
    private readonly presentationRepository: PresentationRepository,
    private readonly subtypeRepository: SubtypeRepository,
    private readonly typeRepository: TypeRepository,
  ) {}

  async findAllItems(): Promise<ResponseItemDto[]> {
    const items = await this.itemRepository.findAll();

    return items.map((item) => toResponseItemDto(item));
  }

  async findByIdItem(id: number): Promise<ResponseItemDto | null> {
    const item = await this.itemRepository.findById(id);

    if (!item) {
      throw new NotFoundException('Item não encontrado');
    }

    return toResponseItemDto(item);
  }
}
