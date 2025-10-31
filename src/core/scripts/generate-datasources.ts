import * as fs from 'fs';
import * as path from 'path';

const MODULES_DIR = path.join(__dirname, '../../modules');
const DATASOURCES_DIR = path.join(__dirname, '../database/datasources');
const MIGRATIONS_DIR = path.join(__dirname, '../database/migrations');

const IGNORED_MODULES = ['auth'];

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function generateDataSourceContent(moduleName: string): string {
  const pascalCaseName = toPascalCase(moduleName);

  return `import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from '../../config/typeorm.config';

const dataSourceOptions: DataSourceOptions = {
  ...(typeOrmConfig as DataSourceOptions),
  entities: [__dirname + '/../../../modules/${moduleName}/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/${moduleName}/*{.ts,.js}'],
};

const ${pascalCaseName}DataSource = new DataSource(dataSourceOptions);

export default ${pascalCaseName}DataSource;
`;
}

async function main() {
  if (!fs.existsSync(DATASOURCES_DIR)) {
    fs.mkdirSync(DATASOURCES_DIR, { recursive: true });
  }

  const modules = fs
    .readdirSync(MODULES_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .filter((name) => !IGNORED_MODULES.includes(name));

  for (const moduleName of modules) {
    const migrationPath = path.join(MIGRATIONS_DIR, moduleName);
    if (!fs.existsSync(migrationPath)) {
      fs.mkdirSync(migrationPath, { recursive: true });
    }

    const dataSourcePath = path.join(
      DATASOURCES_DIR,
      `${moduleName}.datasource.ts`,
    );
    if (!fs.existsSync(dataSourcePath)) {
      fs.writeFileSync(dataSourcePath, generateDataSourceContent(moduleName));
      console.log(`Created datasource for module: ${moduleName}`);
    } else {
      console.log(`- Datasource already exists for module: ${moduleName}`);
    }
  }
}

main().catch(console.error);
