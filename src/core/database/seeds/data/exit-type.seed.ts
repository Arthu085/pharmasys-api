import { ExitTypeEnum } from 'src/modules/inventory-exit/domain/enums/exit-type.enum';

export const EXIT_TYPES_SEED = [
  { name: ExitTypeEnum.PERDA },
  { name: ExitTypeEnum.AJUSTE_ESTOQUE },
  { name: ExitTypeEnum.VALIDADE_VENCIDA },
  { name: ExitTypeEnum.RECOLHIMENTO },
];
