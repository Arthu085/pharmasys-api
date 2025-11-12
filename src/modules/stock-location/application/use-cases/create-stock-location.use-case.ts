import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { StockLocationRepository } from '../../infrastructure/repositories/stock-location.repository';
import { StockLocationCreateDto } from '../dtos/stock-location-create.dto';
import { StockLocationResponseDto } from '../dtos/stock-location-response.dto';
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

  async execute(
    dto: StockLocationCreateDto,
    userId: number,
  ): Promise<StockLocationResponseDto> {
    const user = await this.findOneUserUseCase.findById(userId);
    const existingStockLocation =
      await this.findOneStockLocationUseCase.findByCode(dto.code);

    if (existingStockLocation) {
      await this.stockLocationDomainService.validateStockLocationSameCode(
        existingStockLocation,
        dto.code,
      );
    }

    return plainToInstance(
      StockLocationResponseDto,
      await this.stockLocationRepository.create({
        ...dto,
        userCreated: user,
      }),
      { excludeExtraneousValues: true },
    );
  }
}
