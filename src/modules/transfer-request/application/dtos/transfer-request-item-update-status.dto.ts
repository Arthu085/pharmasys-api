import { IsEnum, IsNotEmpty } from 'class-validator';
import { TransferStatusItemEnum } from '../../domain/enums/transfer-status-item.enum';

export class TransferRequestItemUpdateStatusDto {
  @IsEnum(TransferStatusItemEnum, {
    message: 'O status dos itens da transferência deve ser um enum',
  })
  @IsNotEmpty({ message: 'O status dos itens da transferência é obrigatório' })
  statusTransferItem: TransferStatusItemEnum;
}
