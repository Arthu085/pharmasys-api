import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm';
import { CompanyType } from './company-type.entity';
import { BaseEntity } from 'src/common/entites/base.entity';

@Entity('company', { comment: 'Tabela para cadastro de empresa' })
@Index(['name', 'cnpj'])
export class Company extends BaseEntity {
  @Column({ length: 255, comment: 'Nome da empresa' })
  @Index()
  name: string;

  @Column({ length: 18, unique: true, comment: 'CNPJ da empresa' })
  cnpj: string;

  @ManyToMany(() => CompanyType, (type) => type.companies, { eager: true })
  @JoinTable({
    name: 'company_type_rel',
    joinColumn: {
      name: 'company_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'company_type_id',
      referencedColumnName: 'id',
    },
  })
  companyTypes: CompanyType[];
}
