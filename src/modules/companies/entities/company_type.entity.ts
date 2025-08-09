import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyTypeRel } from './company_type_rel.entity';

@Entity('company_type')
export class CompanyType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @OneToMany(() => CompanyTypeRel, (rel) => rel.companyType)
  companyTypeRels: CompanyTypeRel[];
}
