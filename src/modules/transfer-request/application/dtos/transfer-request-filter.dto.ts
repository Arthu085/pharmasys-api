import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

import { FilterDto } from 'src/shared/dtos/filter.dto';
import { TransferReasonEnum } from '../../domain/enums/transfer-reason.enum';
import { TransferStatusEnum } from '../../domain/enums/transfer-status.enum';

export class TransferRequestFilterDto extends FilterDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Data de requisição deve ser uma data válida' })
  requestDate?: Date;

  @IsOptional()
  @IsUUID('4', { message: 'Origem deve ser um UUID válido' })
  origin?: UUID;

  @IsOptional()
  @IsUUID('4', { message: 'Destino deve ser um UUID válido' })
  destination?: UUID;

  @IsOptional()
  @IsEnum(TransferReasonEnum, { message: 'Motivo deve ser um enum válido' })
  reason?: TransferReasonEnum;

  @IsOptional()
  @IsEnum(TransferStatusEnum, { message: 'Status deve ser um enum válido' })
  statusTransfer?: TransferStatusEnum;

  @IsOptional()
  @IsUUID('4', { message: 'Item deve ser um UUID válido' })
  item?: UUID;

  @IsOptional()
  @IsUUID('4', { message: 'Lote deve ser um UUID válido' })
  batch?: UUID;
}
