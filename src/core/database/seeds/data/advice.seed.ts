import { AdviceEnum } from 'src/modules/prescriptor/domain/enums/advice.enum';

export const ADVICES_SEED = [
  { acronym: AdviceEnum.CRM, fullName: AdviceEnum.CONSELHO_REGIONAL_MEDICINA },
  {
    acronym: AdviceEnum.CRO,
    fullName: AdviceEnum.CONSELHO_REGIONAL_ODONTOLOGIA,
  },
  {
    acronym: AdviceEnum.COREM,
    fullName: AdviceEnum.CONSELHO_REGIONAL_TECNICOS_RADIOLOGIA,
  },
  {
    acronym: AdviceEnum.CRMV,
    fullName: AdviceEnum.CONSELHO_REGIONAL_MEDICINA_VETERINARIA,
  },
  { acronym: AdviceEnum.CRF, fullName: AdviceEnum.CONSELHO_REGIONAL_FARMACIA },
  { acronym: AdviceEnum.CRN, fullName: AdviceEnum.CONSELHO_REGIONAL_NUTRICAO },
];
