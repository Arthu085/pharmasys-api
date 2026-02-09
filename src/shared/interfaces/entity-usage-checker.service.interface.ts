import { UUID } from 'crypto';

export type EntityClass<T = any> = new (...args: any[]) => T;

export interface ReferenceHit {
  entity: string;
  relation: string;
  module?: string;
}

export const IEntityUsageChecker = Symbol('IEntityUsageChecker');

export interface IEntityUsageChecker {
  findReferences(
    targetEntity: EntityClass,
    targetUuid: UUID,
  ): Promise<ReferenceHit[]>;

  assertNotReferenced(
    targetEntity: EntityClass,
    targetUuid: UUID,
    module?: string,
  ): Promise<void>;
}
