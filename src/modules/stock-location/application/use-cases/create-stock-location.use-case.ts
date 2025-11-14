import { Injectable } from '@nestjs/common';
import { StockLocationRepository } from '../../infrastructure/repositories/stock-location.repository';
import { StockLocationCreateDto } from '../dtos/stock-location-create.dto';
import { FindOneStockLocationUseCase } from './find-one-stock-location.use-case';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { StockLocationName } from '../../domain/value-objects/stock-location-name.vo';
import { StockLocationCode } from '../../domain/value-objects/stock-location-code.vo';
import { StockLocationCodeAlreadyExistsException } from '../../domain/exceptions/stock-location-code-already-exists.exception';

@Injectable()
export class CreateStockLocationUseCase {
  constructor(
    private readonly stockLocationRepository: StockLocationRepository,
    private readonly findOneStockLocationUseCase: FindOneStockLocationUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
  ) {}

  async execute(dto: StockLocationCreateDto, userId: number): Promise<void> {
    const name = StockLocationName.create(dto.name);
    const code = StockLocationCode.create(dto.code);
    const user = await this.findOneUserUseCase.findById(userId);
    const existingStockLocation =
      await this.findOneStockLocationUseCase.findByCode(code.getValue());

    if (existingStockLocation) {
      throw new StockLocationCodeAlreadyExistsException();
    }

    await this.stockLocationRepository.create({
      name: name.getValue(),
      code: code.getValue(),
      userCreated: user,
    });
  }
}
