import { Inject, Injectable } from '@nestjs/common';
import { ISubtypeRepository } from '../../domain/repositories/subtype.repository.interface';
import { ItemDomainService } from '../../domain/services/item-domain.service';
import { SubtypeEnum } from '../../domain/enums/subtype.enum';

@Injectable()
export class FindOneSubtypeUseCase {
  constructor(
    @Inject(ISubtypeRepository)
    private readonly subtypeRepository: ISubtypeRepository,
    private readonly itemDomainService: ItemDomainService,
  ) {}

  async findByName(name: SubtypeEnum) {
    const subtype = await this.subtypeRepository.findByName(name);

    return this.itemDomainService.validateSubtype(subtype);
  }
}
