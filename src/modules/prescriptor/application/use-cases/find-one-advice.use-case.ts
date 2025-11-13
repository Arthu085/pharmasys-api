import { Injectable } from '@nestjs/common';
import { AdviceRepository } from '../../infraestructure/repositories/advice.repository';
import { PrescriptorDomainService } from '../../domain/services/prescriptor-domain.service';
import { AdviceEntity } from '../../domain/entities/advice.entity';

@Injectable()
export class FindOneAdviceUseCase {
  constructor(
    private readonly adviceRepository: AdviceRepository,
    private readonly prescriptorDomainService: PrescriptorDomainService,
  ) {}

  async findByAcronym(acronym: string): Promise<AdviceEntity> {
    const advice = await this.adviceRepository.findByAcronym(acronym);

    return this.prescriptorDomainService.validateAdvice(advice);
  }
}
