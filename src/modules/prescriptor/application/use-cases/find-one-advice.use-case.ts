import { Inject, Injectable } from '@nestjs/common';
import { IAdviceRepository } from '../../domain/repositories/advice.repository.interface';
import { PrescriptorDomainService } from '../../domain/services/prescriptor-domain.service';
import { AdviceEntity } from '../../domain/entities/advice.entity';

@Injectable()
export class FindOneAdviceUseCase {
  constructor(
    @Inject(IAdviceRepository)
    private readonly adviceRepository: IAdviceRepository,
    private readonly prescriptorDomainService: PrescriptorDomainService,
  ) {}

  async findByAcronym(acronym: string): Promise<AdviceEntity> {
    const advice = await this.adviceRepository.findByAcronym(acronym);

    return this.prescriptorDomainService.validateAdvice(advice);
  }
}
