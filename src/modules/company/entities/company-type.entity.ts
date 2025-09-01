import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';

@Entity('company_type')
export class CompanyType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @ManyToMany(() => Company, (company) => company.companyTypes)
  companies: Company[];
}
