import { Inject, Injectable } from '@nestjs/common';
import { ITypeRepository } from '../../domain/repositories/type.repository.interface';
import { ItemDomainService } from '../../domain/services/item-domain.service';
import { TypeEnum } from '../../domain/enums/type.enum';

@Injectable()
export class FindOneTypeUseCase {
  constructor(
    @Inject(ITypeRepository)
    private readonly typeRepository: ITypeRepository,
    private readonly itemDomainService: ItemDomainService,
  ) {}

  async findByName(name: TypeEnum) {
    const type = await this.typeRepository.findByName(name);

    return this.itemDomainService.validateType(type);
  }
}
