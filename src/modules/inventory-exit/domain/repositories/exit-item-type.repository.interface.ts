import { ExitItemTypeEntity } from '../entities/exit-item-type.entity';
import { ExitTypeEnum } from '../enums/exit-type.enum';

export const IExitItemTypeRepository = Symbol('IExitItemTypeRepository');

export interface IExitItemTypeRepository {
  findByName(name: ExitTypeEnum): Promise<ExitItemTypeEntity | null>;
}
