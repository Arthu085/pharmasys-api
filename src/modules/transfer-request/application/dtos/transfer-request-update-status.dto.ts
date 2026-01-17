import { IsEnum, IsNotEmpty } from 'class-validator';
import { TransferStatusEnum } from '../../domain/enums/transfer-status.enum';

export class TransferRequestUpdateStatusDto {
  @IsEnum(TransferStatusEnum, {
    message: 'O status da transferência deve ser um enum',
  })
  @IsNotEmpty({ message: 'O status da transferência é obrigatório' })
  statusTransfer: TransferStatusEnum;
}
