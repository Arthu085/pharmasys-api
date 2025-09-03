import { User } from 'src/modules/user/entities/user.entity';
import { StatusEnum } from 'src/shared/enums/status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CompanyType } from './company-type.entity';
import { BaseEntity } from 'src/common/entites/base.entity';

@Entity('company')
export class Company extends BaseEntity {
  @Column({ length: 255 })
  name: string;

  @Column({ length: 18, unique: true })
  cnpj: string;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.A,
    name: 'company_status',
  })
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
