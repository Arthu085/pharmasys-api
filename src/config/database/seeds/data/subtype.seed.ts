import { Type } from 'src/modules/item/entities/type.entity';

export function getSubtypesSeed(medicamentoType: Type) {
  return [
    { name: 'Básico', type: medicamentoType },
    { name: 'Antimicrobiano', type: medicamentoType },
    { name: 'Psicotrópico', type: medicamentoType },
  ];
}
