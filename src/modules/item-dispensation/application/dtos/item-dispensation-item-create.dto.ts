import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UUID } from 'crypto';
('../../domain/entities/inventory-entry.entity');

export class ItemDispensationItemCreateDto {
  @IsUUID('4', { message: 'O item deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O item é obrigatório' })
  item: UUID;

  @IsUUID('4', { message: 'O lote deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O lote é obrigatório' })
  batch: UUID;

  @IsNumber({}, { message: 'A quantidade deve ser um número' })
  @IsNotEmpty({ message: 'A quantidade é obrigatória' })
  quantity: number;

  @IsBoolean({ message: 'O tipo psicotrópico deve ser um booleano' })
  @IsOptional()
  isPsychotropic?: boolean;

  @IsString({
    message: 'O número da notificação da prescrição deve ser uma string',
  })
  @IsOptional()
  prescriptionNotificationNumber?: string;
}
