import { Inject, Injectable } from '@nestjs/common';
import { ItemDomainService } from '../../domain/services/item-domain.service';
import { IPresentationRepository } from '../../domain/repositories/presentation.repository.interface';
import { PresentationEnum } from '../../domain/enums/presentation.enum';

@Injectable()
export class FindOnePresentationUseCase {
  constructor(
    @Inject(IPresentationRepository)
    private readonly presentationRepository: IPresentationRepository,
    private readonly itemDomainService: ItemDomainService,
  ) {}

  async findByName(name: PresentationEnum) {
    const presentation = await this.presentationRepository.findByName(name);

    return this.itemDomainService.validatePresentation(presentation);
  }
}
