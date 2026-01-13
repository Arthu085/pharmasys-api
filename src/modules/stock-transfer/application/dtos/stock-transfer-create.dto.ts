import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class StockTransferCreateDto {
  @IsUUID('4', { message: 'A origem deve ser um UUID válido' })
  @IsNotEmpty({ message: 'A origem é obrigatório' })
  origin: UUID;

  @IsUUID('4', { message: 'O destino deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O destino é obrigatório' })
  destination: UUID;

  @IsDate({ message: 'A data de transferência deve ser uma data' })
  @Type(() => Date)
  @IsNotEmpty({ message: 'A data de transferência é obrigatória' })
  transferDate: Date;
}
