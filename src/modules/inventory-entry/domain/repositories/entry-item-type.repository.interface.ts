import { EntryItemTypeEntity } from '../entities/entry-item-type.entity';
import { EntryTypeEnum } from '../enums/entry-type.enum';

export const IEntryItemTypeRepository = Symbol('IEntryItemTypeRepository');

export interface IEntryItemTypeRepository {
  findByName(name: EntryTypeEnum): Promise<EntryItemTypeEntity | null>;
}
