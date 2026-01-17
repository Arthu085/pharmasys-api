import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

import { TransferReasonEnum } from '../../domain/enums/transfer-reason.enum';

export class TransferRequestCreateDto {
  @IsUUID('4', { message: 'A origem deve ser um UUID válido' })
  @IsNotEmpty({ message: 'A origem é obrigatório' })
  origin: UUID;

  @IsUUID('4', { message: 'O destino deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O destino é obrigatório' })
  destination: UUID;

  @IsDate({ message: 'A data de requisição deve ser uma data' })
  @Type(() => Date)
  @IsNotEmpty({ message: 'A data de requisição é obrigatória' })
  requestDate: Date;

  @IsEnum(TransferReasonEnum, { message: 'O motivo deve ser um enum válido' })
  @IsNotEmpty({ message: 'O motivo é obrigatório' })
  reason: TransferReasonEnum;
}
