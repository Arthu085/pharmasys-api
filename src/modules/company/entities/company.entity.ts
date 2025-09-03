import { User } from 'src/modules/user/entities/user.entity';
import { StatusEnum } from 'src/shared/enums/status.enum';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
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

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.A,
    name: 'company_status',
    comment: 'Status da empresa',
  })
  @Index()
  companyStatus: StatusEnum;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: User;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated: User | null;

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
