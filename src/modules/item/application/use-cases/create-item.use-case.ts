import { Inject, Injectable } from '@nestjs/common';
import { IItemRepository } from '../../domain/repositories/item.repository.interface';
import { ItemCreateDto } from '../dtos/item-create.dto';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { FindOneTypeUseCase } from './find-one-type.use-case';
import { FindOneSubtypeUseCase } from './find-one-subtype.use-case';
import { FindOnePresentationUseCase } from './find-one-presentation.use-case';
import { FindOneDosageUseCase } from './find-one-dosage.use-case';
import { ItemDomainService } from '../../domain/services/item-domain.service';
import { ItemName } from '../../domain/value-objects/item-name.vo';

@Injectable()
export class CreateItemUseCase {
  constructor(
    @Inject(IItemRepository)
    private readonly itemRepository: IItemRepository,
    private readonly itemDomainService: ItemDomainService,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOneTypeUseCase: FindOneTypeUseCase,
    private readonly findOneSubtypeUseCase: FindOneSubtypeUseCase,
    private readonly findOnePresentationUseCase: FindOnePresentationUseCase,
    private readonly findOneDosageUseCase: FindOneDosageUseCase,
  ) {}

  async execute(dto: ItemCreateDto, userId: number): Promise<void> {
    const binds = {
      name: ItemName.create(dto.name),
      type: await this.findOneTypeUseCase.findByName(dto.type),
      presentation: await this.findOnePresentationUseCase.findByName(
        dto.presentation,
      ),
      dosage: await this.findOneDosageUseCase.findByFormat(dto.dosage),
      subtype: dto.subtype
        ? await this.findOneSubtypeUseCase.findByName(dto.subtype)
        : null,
    };

    const userCreating = await this.findOneUserUseCase.findById(userId);

    this.itemDomainService.validatePresentation(binds.presentation);
    this.itemDomainService.validateDosage(binds.dosage);
    this.itemDomainService.validateType(binds.type);

    binds.subtype = this.itemDomainService.validateTypeAndSubtypeCompatibility(
      binds.type,
      binds.subtype,
    );

    await this.itemRepository.create({
      name: binds.name.getValue(),
      type: binds.type,
      presentation: binds.presentation,
      dosage: binds.dosage,
      subtype: binds.subtype,
      userCreated: userCreating,
    });
  }
}
