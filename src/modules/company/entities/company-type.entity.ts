import { Column, Entity, ManyToMany } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { BaseEntity } from 'src/core/database';

@Entity('company_type', {
  comment: 'Tabela para cadastro dos tipos de empresa',
})
export class CompanyTypeEntity extends BaseEntity {
  @Column({ length: 100, unique: true, comment: 'Nome dos tipos de empresa' })
  name: string;

  @ManyToMany(() => CompanyEntity, (company) => company.companyTypes)
  companies: CompanyEntity[];
}
