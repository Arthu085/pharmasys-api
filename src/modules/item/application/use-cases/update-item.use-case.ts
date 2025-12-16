import { Inject, Injectable } from '@nestjs/common';
import { IItemRepository } from '../../domain/repositories/item.repository.interface';
import { ItemUpdateDto } from '../dtos/item-update.dto';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { FindOneItemUseCase } from './find-one-item.use-case';
import { FindOneTypeUseCase } from './find-one-type.use-case';
import { FindOneSubtypeUseCase } from './find-one-subtype.use-case';
import { FindOnePresentationUseCase } from './find-one-presentation.use-case';
import { FindOneDosageUseCase } from './find-one-dosage.use-case';
import { ItemDomainService } from '../../domain/services/item-domain.service';
import { ItemName } from '../../domain/value-objects/item-name.vo';
import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';
import { StatusEnum } from 'src/shared/enums/status.enum';

@Injectable()
export class UpdateItemUseCase {
  constructor(
    @Inject(IItemRepository)
    private readonly itemRepository: IItemRepository,
    private readonly itemDomainService: ItemDomainService,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOneItemUseCase: FindOneItemUseCase,
    private readonly findOneTypeUseCase: FindOneTypeUseCase,
    private readonly findOneSubtypeUseCase: FindOneSubtypeUseCase,
    private readonly findOnePresentationUseCase: FindOnePresentationUseCase,
    private readonly findOneDosageUseCase: FindOneDosageUseCase,
  ) {}

  async execute(
    uuid: string,
    dto: ItemUpdateDto,
    userId: number,
  ): Promise<void> {
    const user = await this.findOneUserUseCase.findById(userId);
    const item = await this.findOneItemUseCase.findEntityByUuid(uuid);

    this.itemDomainService.validateItemAndEnsureActive(item);

    if (dto.name) {
      const name = ItemName.create(dto.name);
      item.changeName(name);
    }

    if (dto.dosage) {
      const dosage = await this.findOneDosageUseCase.findByFormat(dto.dosage);
      this.itemDomainService.validateDosage(dosage);
      item.changeDosage(dosage);
    }

    if (dto.type) {
      const type = await this.findOneTypeUseCase.findByName(dto.type);
      this.itemDomainService.validateType(type);
      item.changeType(type);
    }

    if (dto.presentation) {
      const presentation = await this.findOnePresentationUseCase.findByName(
        dto.presentation,
      );
      this.itemDomainService.validatePresentation(presentation);
      item.changePresentation(presentation);
    }

    if (dto.subtype) {
      const subtype = this.itemDomainService.validateSubtype(
        await this.findOneSubtypeUseCase.findByName(dto.subtype),
      );
      item.changeSubtype(subtype);
    }

    item.userUpdated = user;

    await this.itemRepository.update(item);
  }

  async updateStatus(
    uuid: string,
    dto: ChangeStatusDto,
    userId: number,
  ): Promise<void> {
    const user = await this.findOneUserUseCase.findById(userId);
    const item = await this.findOneItemUseCase.findEntityByUuid(uuid, false);

    this.itemDomainService.validateItemSameStatus(item, dto.status);

    if (dto.status === StatusEnum.ATIVO) {
      item.activate();
    } else {
      item.deactivate();
    }

    item.userUpdated = user;

    await this.itemRepository.update(item);
  }
}
