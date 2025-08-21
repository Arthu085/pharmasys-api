import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ItemRepository } from '../repositories/item.repository';
import { CreateItemDto } from '../DTOs/create.item.dto';
import { PresentationRepository } from '../repositories/presentation.repository';
import { TypeRepository } from '../repositories/type.repository';
import { DosageRepository } from '../repositories/dosage.repository';
import { SubtypeRepository } from '../repositories/subtype.repository';
import { TypeEnum } from 'src/common/enums/items/type.enum';
import { PresentationEnum } from 'src/common/enums/items/presentation.enum';
import { DosageEnum } from 'src/common/enums/items/dosage.enum';
import { SubtypeEnum } from 'src/common/enums/items/subtype.enum';
import { UpdateItemDto } from '../DTOs/update.item.dto';
import { ResponseItemDto } from '../DTOs/response.item.dto';
import { toResponseItemDto } from '../mappers/item.mapper';

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
    const items = await this.itemRepository.findAll();

    if (items.length === 0) {
      throw new NotFoundException('Nenhum item encontrado');
    }

    return items;
  }

  async findItemById(id: number): Promise<ResponseItemDto> {
    const item = await this.itemRepository.findById(id);

    if (!item) {
      throw new NotFoundException('Item não encontrado');
    }

    return toResponseItemDto(item);
  }

  async findItemByIdForUpdate(id: number) {
    const item = await this.itemRepository.findById(id);

    if (!item) {
      throw new NotFoundException('Item não encontrado');
    }

    return item;
  }

  async createItem(createItemDto: CreateItemDto, userId: number) {
    const existingItem = await this.itemRepository.findByName(
      createItemDto.name.toLowerCase(),
    );

    if (existingItem) {
      throw new ConflictException('Item já existe com esse nome');
    }

    const type = await this.typeRepository.findByName(
      TypeEnum[createItemDto.type],
    );
    const presentation = await this.presentationRepository.findByName(
      PresentationEnum[createItemDto.presentation],
    );
    const dosage = await this.dosageRepository.findByFormat(
      DosageEnum[createItemDto.dosage],
    );
    let subtype = createItemDto.subtype
      ? await this.subtypeRepository.findByName(
          SubtypeEnum[createItemDto.subtype],
        )
      : null;

    if (type?.name !== TypeEnum.M && createItemDto.subtype) {
      throw new ConflictException(
        'Subtipo só pode ser definido para Medicamentos',
      );
    }

    if (type?.name !== TypeEnum.M) {
      subtype = null;
    }

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

  async deleteItem(id: number) {
    await this.itemRepository.delete(id);

    return { message: `Item com ID ${id} deletado com sucesso` };
  }

  async updateItem(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.findItemByIdForUpdate(id);

    // Verificar se o novo nome já existe em outro item
    if (
      updateItemDto.name &&
      updateItemDto.name.toLowerCase() !== item.name.toLowerCase()
    ) {
      const existingItem = await this.itemRepository.findByName(
        updateItemDto.name,
      );
      if (existingItem) {
        throw new ConflictException('Este nome já está em uso por outro item');
      }
    }

    // Buscar entidades relacionadas se foram fornecidas
    const type = updateItemDto.type
      ? await this.typeRepository.findByName(TypeEnum[updateItemDto.type])
      : item.type;

    if (updateItemDto.type && !type) {
      throw new NotFoundException('Tipo informado não foi encontrado');
    }

    const presentation = updateItemDto.presentation
      ? await this.presentationRepository.findByName(
          PresentationEnum[updateItemDto.presentation],
        )
      : item.presentation;

    if (updateItemDto.presentation && !presentation) {
      throw new NotFoundException('Apresentação informada não foi encontrada');
    }

    const dosage = updateItemDto.dosage
      ? await this.dosageRepository.findByFormat(
          DosageEnum[updateItemDto.dosage],
        )
      : item.dosage;

    if (updateItemDto.dosage && !dosage) {
      throw new NotFoundException('Dosagem informada não foi encontrada');
    }

    let subtype = updateItemDto.subtype
      ? await this.subtypeRepository.findByName(
          SubtypeEnum[updateItemDto.subtype],
        )
      : item.subtype;

    if (updateItemDto.subtype && !subtype) {
      throw new NotFoundException('Subtipo informado não foi encontrado');
    }

    if (type?.name !== TypeEnum.M && updateItemDto.subtype) {
      throw new ConflictException(
        'Subtipo só pode ser definido para Medicamentos',
      );
    }

    if (type?.name !== TypeEnum.M) {
      subtype = null;
    }

    // Atualizar e salvar
    const updateItem = await this.itemRepository.save({
      ...item,
      ...updateItemDto,
      type: type!,
      presentation: presentation!,
      dosage: dosage!,
      subtype,
    });

    return toResponseItemDto(updateItem);
  }
}
