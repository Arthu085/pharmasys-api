import { Inject, Injectable } from '@nestjs/common';
import { IDosageRepository } from '../../domain/repositories/dosage.repository.interface';
import { ItemDomainService } from '../../domain/services/item-domain.service';
import { DosageEnum } from '../../domain/enums/dosage.enum';

@Injectable()
export class FindOneDosageUseCase {
  constructor(
    @Inject(IDosageRepository)
    private readonly dosageRepository: IDosageRepository,
    private readonly itemDomainService: ItemDomainService,
  ) {}

  async findByFormat(format: DosageEnum) {
    const dosage = await this.dosageRepository.findByFormat(format);

    return this.itemDomainService.validateDosage(dosage);
  }
}
