import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class StockBalanceCreateDto {
  @IsNotEmpty({ message: 'O item é obrigatório' })
  @IsUUID('4', { message: 'Item deve ser um UUID válido' })
  item: UUID;

  @IsNotEmpty({ message: 'O lote é obrigatório' })
  @IsUUID('4', { message: 'Lote deve ser um UUID válido' })
  batch: UUID;

  @IsNotEmpty({ message: 'O local de estoque é obrigatório' })
  @IsUUID('4', { message: 'Local de estoque deve ser um UUID válido' })
  stockLocation: UUID;

  @IsNotEmpty({ message: 'A quantidade é obrigatória' })
  @IsNumber({}, { message: 'A quantidade deve ser um número' })
  quantity: number;
}
