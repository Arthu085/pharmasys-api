import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ItemRepository } from '../repositories/item.repository';
import { DosageRepository } from '../repositories/dosage.repository';
import { PresentationRepository } from '../repositories/presentation.repository';
import { SubtypeRepository } from '../repositories/subtype.repository';
import { TypeRepository } from '../repositories/type.repository';
import { ResponseItemDto } from '../DTOs/response.item.dto';
import { toResponseItemDto } from '../mappers/item.mapper';
import { CreateItemDto } from '../DTOs/create.item.dto';
import { TypeEnum } from '../enums/type.enum';
import { PresentationEnum } from '../enums/presentation.enum';
import { DosageEnum } from '../enums/dosage.enum';
import { SubtypeEnum } from '../enums/subtype.enum';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class ItemService {
  private readonly logger = new Logger(ItemService.name);

  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly dosageRepository: DosageRepository,
    private readonly presentationRepository: PresentationRepository,
    private readonly subtypeRepository: SubtypeRepository,
    private readonly typeRepository: TypeRepository,
    private readonly userService: UserService,
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

  async createItem(
    dto: CreateItemDto,
    userId: number,
  ): Promise<ResponseItemDto> {
    const user = await this.userService.findByIdShared(userId);

    const existingItem = await this.itemRepository.findByName(dto.name);

    if (existingItem) {
      throw new ConflictException('Existe um item com esse nome');
    }

    const type = await this.typeRepository.findByName(TypeEnum[dto.type]);
    const presentation = await this.presentationRepository.findByName(
      PresentationEnum[dto.presentation],
    );
    const dosage = await this.dosageRepository.findByFormat(
      DosageEnum[dto.dosage],
    );
    let subtype = dto.subtype
      ? await this.subtypeRepository.findByName(SubtypeEnum[dto.subtype])
      : null;

    if (type?.name !== TypeEnum.M && dto.subtype) {
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

    try {
      const item = await this.itemRepository.create({
        ...dto,
        type,
        presentation,
        dosage,
        subtype,
        userCreated: user,
      });

      const result = await this.itemRepository.save(item);

      return toResponseItemDto(result);
    } catch (error) {
      this.logger.error(
        `Falha ao cadastrar item. Error: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao cadastrar o item',
      );
    }
  }
}
