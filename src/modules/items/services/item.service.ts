import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemRepository } from '../repositories/item.repository';
import { CreateItemDto } from '../DTOs/create.item.dto';
import { PresentationRepository } from '../repositories/presentation.repository';
import { TypeRepository } from '../repositories/type.repository';
import { DosageRepository } from '../repositories/dosage.repository';
import { SubtypeRepository } from '../repositories/subtype.repository';
import { TypeEnum } from 'src/common/enums/type.enum';
import { PresentationEnum } from 'src/common/enums/presentation.enum';
import { DosageEnum } from 'src/common/enums/dosage.enum';
import { SubtypeEnum } from 'src/common/enums/subtype.enum';

@Injectable()
export class ItemService {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly presentationRepository: PresentationRepository,
    private readonly typeRepository: TypeRepository,
    private readonly dosageRepository: DosageRepository,
    private readonly subtypeRepository: SubtypeRepository,
  ) {}

  async findAllItems() {
    return this.itemRepository.findAll();
  }

  async findItemById(id: number) {
    const item = await this.itemRepository.findById(id);

    if (!item) {
      throw new NotFoundException('Item não encontrado');
    }

    return item;
  }

  async createItem(createItemDto: CreateItemDto, userId: number) {
    const type = await this.typeRepository.findByName(
      TypeEnum[createItemDto.type],
    );
    const presentation = await this.presentationRepository.findByName(
      PresentationEnum[createItemDto.presentation],
    );
    const dosage = await this.dosageRepository.findByFormat(
      DosageEnum[createItemDto.dosage],
    );
    const subtype = createItemDto.subtype
      ? await this.subtypeRepository.findByName(
          SubtypeEnum[createItemDto.subtype],
        )
      : null;

    if (!type || !presentation || !dosage) {
      throw new NotFoundException(
        'Alguma entidade relacionada não foi encontrada',
      );
    }

    const item = this.itemRepository.create({
      name: createItemDto.name,
      type,
      presentation,
      dosage,
      subtype,
      user_id: userId,
    });

    return this.itemRepository.save(item);
  }
}
