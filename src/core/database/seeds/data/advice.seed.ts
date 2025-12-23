import { AdviceEnum } from 'src/modules/prescriptor/domain/enums/advice.enum';

export const ADVICES_SEED = [
  { acronym: AdviceEnum.CRM, fullName: 'CONSELHO_REGIONAL_MEDICINA' },
  {
    acronym: AdviceEnum.CRO,
    fullName: 'CONSELHO_REGIONAL_ODONTOLOGIA',
  },
  {
    acronym: AdviceEnum.COREM,
    fullName: 'CONSELHO_REGIONAL_TECNICOS_RADIOLOGIA',
  },
  {
    acronym: AdviceEnum.CRMV,
    fullName: 'CONSELHO_REGIONAL_MEDICINA_VETERINARIA',
  },
  { acronym: AdviceEnum.CRF, fullName: 'CONSELHO_REGIONAL_FARMACIA' },
  { acronym: AdviceEnum.CRN, fullName: 'CONSELHO_REGIONAL_NUTRICAO' },
];
