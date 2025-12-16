import { TypeEntity } from 'src/modules/item/domain/entities/type.entity';
import { SubtypeEnum } from 'src/modules/item/domain/enums/subtype.enum';

export function getSubtypesSeed(medicamentoType: TypeEntity) {
  return [
    { name: SubtypeEnum.BASICO, type: medicamentoType },
    { name: SubtypeEnum.ANTIMICROBIANO, type: medicamentoType },
    { name: SubtypeEnum.PSICOTROPICO, type: medicamentoType },
  ];
}
