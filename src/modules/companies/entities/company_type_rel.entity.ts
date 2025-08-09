import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Company } from './company.entity';
import { CompanyType } from './company_type.entity';

@Entity('company_type_rel')
export class CompanyTypeRel {
  @PrimaryColumn({ name: 'company_id' })
  companyId: number;

  @PrimaryColumn({ name: 'company_type_id' })
  companyTypeId: number;

  @ManyToOne(() => Company, (company) => company.companyTypeRels, {
    eager: true,
  })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => CompanyType, (companyType) => companyType.companyTypeRels, {
    eager: true,
  })
  @JoinColumn({ name: 'company_type_id' })
  companyType: CompanyType;
}
