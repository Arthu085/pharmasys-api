import { DataSource, ObjectLiteral, Repository } from 'typeorm';
import AppDataSource from 'src/config/data.source';

import { ROLES_SEED } from './data/role.seed';
import { TYPES_SEED } from './data/type.seed';
import { COMPANY_TYPES_SEED } from './data/company-type.seed';
import { DOSAGES_SEED } from './data/dosage.seed';
import { PRESENTATIONS_SEED } from './data/presentation.seed';
import { STOCK_LOCATIONS_SEED } from './data/stock-location.seed';
import { getSubtypesSeed } from './data/subtype.seed';

import { Role } from 'src/modules/user/entities/role.entity';
import { Type } from 'src/modules/item/entities/type.entity';
import { CompanyType } from 'src/modules/company/entities/company-type.entity';
import { Dosage } from 'src/modules/item/entities/dosage.entity';
import { Presentation } from 'src/modules/item/entities/presentation.entity';
import { StockLocation } from 'src/modules/stock-location/entities/stock-location.entity';
import { Subtype } from 'src/modules/item/entities/subtype.entity';

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
  const insertedEntities = await repository.findByIds(result.identifiers);
  return insertedEntities;
}

async function runSeeds(dataSource: DataSource): Promise<void> {
  await upsertGeneric(
    dataSource.getRepository(Role),
    ROLES_SEED,
    ['name'],
    'Roles',
  );
  const typeResults = await upsertGeneric(
    dataSource.getRepository(Type),
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
    dataSource.getRepository(Subtype),
    subtypesWithIds,
    ['name'],
    'Subtypes',
  );

  await upsertGeneric(
    dataSource.getRepository(CompanyType),
    COMPANY_TYPES_SEED,
    ['name'],
    'Company Types',
  );
  await upsertGeneric(
    dataSource.getRepository(Dosage),
    DOSAGES_SEED,
    ['format'],
    'Dosages',
  );
  await upsertGeneric(
    dataSource.getRepository(Presentation),
    PRESENTATIONS_SEED,
    ['name'],
    'Presentations',
  );
  await upsertGeneric(
    dataSource.getRepository(StockLocation),
    STOCK_LOCATIONS_SEED,
    ['code'],
    'Stock Locations',
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
