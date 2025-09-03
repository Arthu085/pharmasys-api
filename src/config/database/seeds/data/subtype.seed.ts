import { Type } from 'src/modules/item/entities/type.entity';

export function getSubtypesSeed(medicamentoType: Type) {
  return [
    { name: 'Básico', type: medicamentoType },
    { name: 'Antimicrobiano', type: medicamentoType },
    { name: 'Psicotrópico', type: medicamentoType },
  ];
}

export const SUBTYPES_SEED = [
  { name: 'Comprimido', type_id: null },
  { name: 'Líquido', type_id: null },
  { name: 'Ampola', type_id: null },
];
