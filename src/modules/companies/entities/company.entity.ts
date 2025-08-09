import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyTypeRel } from './company_type_rel.entity';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 180 })
  cnpj: string;

  @OneToMany(() => CompanyTypeRel, (rel) => rel.company)
  companyTypeRels: CompanyTypeRel[];
}
