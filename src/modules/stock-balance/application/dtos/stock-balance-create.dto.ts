import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { StockBalanceOperationType } from '../../domain/enums/stock-balance-operation-type.enum';
import { ItemEntity } from 'src/modules/item/domain/entities/item.entity';
import { BatchEntity } from 'src/modules/batch/domain/entities/batch.entity';
import { StockLocationEntity } from 'src/modules/stock-location/domain/entities/stock-location.entity';

export class StockBalanceCreateDto {
  @IsNotEmpty({ message: 'O item é obrigatório' })
  item: ItemEntity;

  @IsNotEmpty({ message: 'O lote é obrigatório' })
  batch: BatchEntity;

  @IsNotEmpty({ message: 'O local de estoque é obrigatório' })
  stockLocation: StockLocationEntity;

  @IsNotEmpty({ message: 'A quantidade é obrigatória' })
  @IsNumber({}, { message: 'A quantidade deve ser um número' })
  quantity: number;

  @IsEnum(StockBalanceOperationType, { message: 'Tipo de operação inválido' })
  @IsNotEmpty({ message: 'O tipo de operação é obrigatório' })
  type: StockBalanceOperationType;
}
