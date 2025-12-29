import { PartialType, OmitType } from '@nestjs/mapped-types';
import { StockBalanceCreateDto } from './stock-balance-create.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { StockBalanceOperationType } from '../../domain/enums/stock-balance-operation-type.enum';

export class StockBalanceUpdateDto extends PartialType(
  OmitType(StockBalanceCreateDto, ['item', 'batch'] as const),
) {
  @IsEnum(StockBalanceOperationType, { message: 'Tipo de operação inválido' })
  @IsNotEmpty({ message: 'O tipo de operação é obrigatório' })
  type: StockBalanceOperationType;
}
