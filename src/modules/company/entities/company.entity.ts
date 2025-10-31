import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { CompanyTypeEntity } from './company-type.entity';
import { BaseEntity } from 'src/core/database';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Entity('company', { comment: 'Tabela para cadastro de empresa' })
@Index(['name', 'cnpj'])
export class CompanyEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: UserEntity;

  @ManyToOne(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: UserEntity | null;

  @Column({ length: 255, comment: 'Nome da empresa' })
  @Index()
  name: string;

  @Column({ length: 18, unique: true, comment: 'CNPJ da empresa' })
  cnpj: string;

  @ManyToMany(() => CompanyTypeEntity, (type) => type.companies, {
    eager: true,
  })
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
  companyTypes: CompanyTypeEntity[];
}
