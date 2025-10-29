import { TypeEntity } from 'src/modules/item/entities/type.entity';

export function getSubtypesSeed(medicamentoType: TypeEntity) {
  return [
    { name: 'Básico', type: medicamentoType },
    { name: 'Antimicrobiano', type: medicamentoType },
    { name: 'Psicotrópico', type: medicamentoType },
  ];
}
