import { TransferReasonEntity } from '../entities/transfer-reason.entity';
import { TransferReasonEnum } from '../enums/transfer-reason.enum';

export const ITransferReasonRepository = Symbol('ITransferReasonRepository');

export interface ITransferReasonRepository {
  findByName(name: TransferReasonEnum): Promise<TransferReasonEntity | null>;
}
