import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

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

  async execute(uuid: UUID, dto: ItemUpdateDto, userId: number): Promise<void> {
    const binds = {
      userUpdated: await this.findOneUserUseCase.findById(userId),
      name: dto.name ? ItemName.create(dto.name) : undefined,
      type: dto.type
        ? await this.findOneTypeUseCase.findByName(dto.type)
        : undefined,
      presentation: dto.presentation
        ? await this.findOnePresentationUseCase.findByName(dto.presentation)
        : undefined,
      dosage: dto.dosage
        ? await this.findOneDosageUseCase.findByFormat(dto.dosage)
        : undefined,
      subtype: dto.subtype
        ? await this.findOneSubtypeUseCase.findByName(dto.subtype)
        : null,
    };

    const item = await this.findOneItemUseCase.findEntityByUuid(uuid);

    this.itemDomainService.validateItemAndEnsureActive(item);

    if (binds.name) {
      item.changeName(binds.name);
    }

    if (binds.dosage) {
      this.itemDomainService.validateDosage(binds.dosage);

      item.changeDosage(binds.dosage);
    }

    if (binds.type) {
      this.itemDomainService.validateType(binds.type);
      this.itemDomainService.validateTypeAndSubtypeCompatibility(
        binds.type,
        item.subtype ?? null,
      );

      item.changeType(binds.type);
    }

    if (binds.presentation) {
      this.itemDomainService.validatePresentation(binds.presentation);

      item.changePresentation(binds.presentation);
    }

    if (binds.subtype) {
      this.itemDomainService.validateTypeAndSubtypeCompatibility(
        item.type,
        binds.subtype,
      );
    }

    item.changeSubtype(binds.subtype);

    item.userUpdated = binds.userUpdated;

    await this.itemRepository.update(item.uuid, item);
  }

  async updateStatus(
    uuid: UUID,
    dto: ChangeStatusDto,
    userId: number,
  ): Promise<void> {
    const binds = {
      userUpdated: await this.findOneUserUseCase.findById(userId),
    };

    const item = await this.findOneItemUseCase.findEntityByUuid(uuid, false);

    this.itemDomainService.validateItemSameStatus(item, dto.status);

    if (dto.status === StatusEnum.ATIVO) {
      item.activate();
    } else {
      item.deactivate();
    }

    item.userUpdated = binds.userUpdated;

    await this.itemRepository.update(item.uuid, item);
  }
}
