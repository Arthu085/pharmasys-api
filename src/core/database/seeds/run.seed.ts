import { DataSource, ObjectLiteral, Repository, In } from 'typeorm';
import AppDataSource from '../data-source';

import { ROLES_SEED } from './data/role.seed';
import { TYPES_SEED } from './data/type.seed';
import { COMPANY_TYPES_SEED } from './data/company-type.seed';
import { DOSAGES_SEED } from './data/dosage.seed';
import { PRESENTATIONS_SEED } from './data/presentation.seed';
import { STOCK_LOCATIONS_SEED } from './data/stock-location.seed';
import { getSubtypesSeed } from './data/subtype.seed';
import { getRolesSeed } from './data/user.seed';
import { ADVICES_SEED } from './data/advice.seed';
import { ENTRY_TYPES_SEED } from './data/entry-type.seed';
import { EXIT_TYPES_SEED } from './data/exit-type.seed';
import { TRANSFER_REASONS_SEED } from './data/transfer-reason.seed';

import { RoleEntity } from '../../../modules/user/domain/entities/role.entity';
import { TypeEntity } from '../../../modules/item/entities/type.entity';
import { CompanyTypeEntity } from '../../../modules/company/entities/company-type.entity';
import { DosageEntity } from '../../../modules/item/entities/dosage.entity';
import { PresentationEntity } from '../../../modules/item/entities/presentation.entity';
import { StockLocationEntity } from '../../../modules/stock-location/domain/entities/stock-location.entity';
import { SubtypeEntity } from '../../../modules/item/entities/subtype.entity';
import { AdviceEntity } from '../../../modules/prescriptor/domain/entities/advice.entity';
import { EntryItemTypeEntity } from '../../../modules/inventory-entry/domain/entities/entry-item-type.entity';
import { ExitItemTypeEntity } from '../../../modules/inventory-exit/domain/entities/exit-item-type.entity';
import { UserEntity } from '../../../modules/user/domain/entities/user.entity';
import { TransferReasonEntity } from '../../../modules/transfer-request/domain/entities/transfer-reason.entity';

async function upsertGeneric<T extends ObjectLiteral>(
  repository: Repository<T>,
  data: Partial<T>[],
  conflictColumns: (keyof T)[],
  entityName: string,
): Promise<T[]> {
  const result = await repository.upsert(
    data as any[],
    conflictColumns as string[],
  );
  console.log(`${entityName} seeded`);

  const ids = result.identifiers.map((identifier) => identifier.id);
  const insertedEntities = await repository.findBy({ id: In(ids) } as any);

  return insertedEntities;
}

async function runSeeds(dataSource: DataSource): Promise<void> {
  const roleResults = await upsertGeneric(
    dataSource.getRepository(RoleEntity),
    ROLES_SEED,
    ['name'],
    'Roles',
  );
  const roleId = roleResults.find((id) => id.name === 'ADMIN');

  if (!roleId) {
    throw new Error(
      'Tipo "ADMIN" não encontrado. Não é possível semear os usuários.',
    );
  }

  const rolesWithIds = getRolesSeed(roleId);

  await upsertGeneric(
    dataSource.getRepository(UserEntity),
    rolesWithIds,
    ['email'],
    'Users',
  );

  const typeResults = await upsertGeneric(
    dataSource.getRepository(TypeEntity),
    TYPES_SEED,
    ['name'],
    'Types',
  );
  const medicamentoType = typeResults.find(
    (type) => type.name === 'Medicamento',
  );

  if (!medicamentoType) {
    throw new Error(
      'Tipo "Medicamento" não encontrado. Não é possível semear os Subtipos.',
    );
  }

  const subtypesWithIds = getSubtypesSeed(medicamentoType);

  await upsertGeneric(
    dataSource.getRepository(SubtypeEntity),
    subtypesWithIds,
    ['name'],
    'Subtypes',
  );

  await upsertGeneric(
    dataSource.getRepository(CompanyTypeEntity),
    COMPANY_TYPES_SEED,
    ['name'],
    'Company Types',
  );
  await upsertGeneric(
    dataSource.getRepository(DosageEntity),
    DOSAGES_SEED,
    ['format'],
    'Dosages',
  );
  await upsertGeneric(
    dataSource.getRepository(PresentationEntity),
    PRESENTATIONS_SEED,
    ['name'],
    'Presentations',
  );
  await upsertGeneric(
    dataSource.getRepository(StockLocationEntity),
    STOCK_LOCATIONS_SEED,
    ['code'],
    'Stock Locations',
  );
  await upsertGeneric(
    dataSource.getRepository(AdviceEntity),
    ADVICES_SEED,
    ['acronym'],
    'Advices',
  );
  await upsertGeneric(
    dataSource.getRepository(EntryItemTypeEntity),
    ENTRY_TYPES_SEED,
    ['name'],
    'Entry Types',
  );
  await upsertGeneric(
    dataSource.getRepository(ExitItemTypeEntity),
    EXIT_TYPES_SEED,
    ['name'],
    'Exit Types',
  );
  await upsertGeneric(
    dataSource.getRepository(TransferReasonEntity),
    TRANSFER_REASONS_SEED,
    ['name'],
    'Transfer Reasons Types',
  );
}

AppDataSource.initialize()
  .then(async () => {
    console.log('Starting database seeding...');
    await runSeeds(AppDataSource);
    console.log('Seeding complete!');
  })
  .catch((error) => console.error('Error during database seeding:', error))
  .finally(() => {
    if (AppDataSource.isInitialized) {
      AppDataSource.destroy();
    }
  });
