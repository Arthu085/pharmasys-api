import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
('../../domain/entities/inventory-entry.entity');

export class InventoryExitItemCreateDto {
  @IsUUID('4', { message: 'O item deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O item é obrigatório' })
  item: UUID;

  @IsUUID('4', { message: 'O lote deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O lote é obrigatório' })
  batch: UUID;

  @IsNumber({}, { message: 'A quantidade deve ser um número' })
  @IsNotEmpty({ message: 'A quantidade é obrigatória' })
  quantity: number;
}
