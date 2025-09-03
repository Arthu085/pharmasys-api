import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';
import { BaseEntity } from 'src/common/entites/base.entity';

@Entity('company_type')
export class CompanyType extends BaseEntity {
  @Column({ length: 100, unique: true })
  name: string;

  @ManyToMany(() => Company, (company) => company.companyTypes)
  companies: Company[];
}
