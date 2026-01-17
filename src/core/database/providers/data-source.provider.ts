import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { ObjectLiteral } from 'typeorm';

@Injectable()
export class DataSourceProvider {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  getDataSource(): DataSource {
    return this.dataSource;
  }

  getRepository<T extends ObjectLiteral>(entity: { new (): T }): Repository<T> {
    return this.dataSource.getRepository(entity);
  }

  getEntityManager(): EntityManager {
    return this.dataSource.manager;
  }
}
