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
    const name = ItemName.create(dto.name);
    const user = await this.findOneUserUseCase.findById(userId);
    const type = await this.findOneTypeUseCase.findByName(dto.type);
    this.itemDomainService.validateType(type);

    const presentation = await this.findOnePresentationUseCase.findByName(
      dto.presentation,
    );
    this.itemDomainService.validatePresentation(presentation);

    const dosage = await this.findOneDosageUseCase.findByFormat(dto.dosage);
    this.itemDomainService.validateDosage(dosage);

    let subtype = dto.subtype
      ? this.itemDomainService.validateSubtype(
          await this.findOneSubtypeUseCase.findByName(dto.subtype),
        )
      : null;

    subtype = this.itemDomainService.validateTypeAndSubtypeCompatibility(
      type,
      subtype,
    );

    await this.itemRepository.create({
      ...dto,
      name: name.getValue(),
      type: type,
      presentation: presentation,
      dosage: dosage,
      subtype: subtype,
      userCreated: user,
    });
  }
}
