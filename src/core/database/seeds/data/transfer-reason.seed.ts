import { TransferReasonEnum } from 'src/modules/transfer-request/domain/enums/transfer-reason.enum';

export const TRANSFER_REASONS_SEED = [
  { name: TransferReasonEnum.REPOSICAO_CONSUMO },
  { name: TransferReasonEnum.PERDA },
  { name: TransferReasonEnum.VALIDADE_VENCIDA },
  { name: TransferReasonEnum.RECOLHIMENTO },
];
