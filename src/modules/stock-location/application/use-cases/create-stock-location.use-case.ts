import { Injectable } from '@nestjs/common';
import { StockLocationRepository } from '../../infrastructure/repositories/stock-location.repository';
import { StockLocationCreateDto } from '../dtos/stock-location-create.dto';
import { FindOneStockLocationUseCase } from './find-one-stock-location.use-case';
import { StockLocationDomainService } from '../../domain/services/stock-location-domain.service';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';

@Injectable()
export class CreateStockLocationUseCase {
  constructor(
    private readonly stockLocationRepository: StockLocationRepository,
    private readonly findOneStockLocationUseCase: FindOneStockLocationUseCase,
    private readonly stockLocationDomainService: StockLocationDomainService,
    private readonly findOneUserUseCase: FindOneUserUseCase,
  ) {}

  async execute(dto: StockLocationCreateDto, userId: number): Promise<void> {
    const user = await this.findOneUserUseCase.findById(userId);
    const existingStockLocation =
      await this.findOneStockLocationUseCase.findByCode(dto.code);

    if (existingStockLocation) {
      this.stockLocationDomainService.validateStockLocationSameCode();
    }

    await this.stockLocationRepository.create({
      ...dto,
      userCreated: user,
    });
  }
}
