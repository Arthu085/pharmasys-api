import { Inject, Injectable } from '@nestjs/common';
import { IDosageRepository } from '../../domain/repositories/dosage.repository.interface';
import { ItemDomainService } from '../../domain/services/item-domain.service';

@Injectable()
export class FindOneDosageUseCase {
  constructor(
    @Inject(IDosageRepository)
    private readonly dosageRepository: IDosageRepository,
    private readonly itemDomainService: ItemDomainService,
  ) {}

  async findByFormat(format: string) {
    const dosage = await this.dosageRepository.findByFormat(format);

    return this.itemDomainService.validateDosage(dosage);
  }
}
