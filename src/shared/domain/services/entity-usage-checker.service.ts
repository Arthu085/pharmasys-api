import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { DataSource } from 'typeorm';

import { EntityReferencedException } from 'src/shared/exceptions/entity-referenced.exception';
import {
  EntityClass,
  IEntityUsageChecker,
  ReferenceHit,
} from '../../interfaces/entity-usage-checker.service.interface';

@Injectable()
export class EntityUsageCheckerService implements IEntityUsageChecker {
  constructor(private readonly dataSource: DataSource) {}

  async findReferences(
    targetEntity: EntityClass,
    targetUuid: UUID,
  ): Promise<ReferenceHit[]> {
    const targetMeta = this.dataSource.getMetadata(targetEntity);
    const hits: ReferenceHit[] = [];

    for (const meta of this.dataSource.entityMetadatas) {
      for (const rel of meta.relations) {
        const pointsToTarget = rel.inverseEntityMetadata === targetMeta;

        const isOwningFkSide =
          rel.isManyToOne || (rel.isOneToOne && rel.isOneToOneOwner);

        if (!pointsToTarget || !isOwningFkSide) continue;

        const repo = this.dataSource.getRepository(meta.target as any);

        const exists = await repo.exist({
          where: {
            [rel.propertyName]: { uuid: targetUuid },
          } as any,
        });

        if (exists) {
          hits.push({ entity: meta.name, relation: rel.propertyName });
        }
      }
    }

    return hits;
  }

  async assertNotReferenced(
    targetEntity: EntityClass,
    targetUuid: UUID,
    module?: string,
  ): Promise<void> {
    const refs = await this.findReferences(targetEntity, targetUuid);

    if (refs.length > 0) {
      throw new EntityReferencedException(
        `${module ?? 'Registro'} não pode ser deletado pois existem dados utilizando o mesmo, é possível apenas inativar`,
      );
    }
  }
}
