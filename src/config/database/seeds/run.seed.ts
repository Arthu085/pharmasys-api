import { DataSource } from 'typeorm';
import AppDataSource from 'src/config/data.source';

import { ROLES_SEED } from './data/role.seed';
import { TYPES_SEED } from './data/type.seed';

import { Role } from 'src/modules/user/entities/role.entity';
import { Type } from 'src/modules/item/entities/type.entity';

async function runSeeds(dataSource: DataSource): Promise<void> {
  const roleRepository = dataSource.getRepository(Role);
  const typeRepository = dataSource.getRepository(Type);

  await roleRepository.upsert(ROLES_SEED, ['name']);
  console.log('✅ Roles seeded');

  await typeRepository.upsert(TYPES_SEED, ['name']);
  console.log('✅ Types seeded');
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
