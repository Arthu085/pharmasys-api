import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CompanyTypeRel } from './company_type_rel.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { GlobalStatusEnum } from 'src/common/enums/global.status.enum';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 18 })
  cnpj: string;

  @Column({ length: 1, default: GlobalStatusEnum.A, name: 'company_status' })
  companyStatus: GlobalStatusEnum;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column()
  user_created_id: number;

  @Column()
  user_updated_id: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated: User;

  @OneToMany(() => CompanyTypeRel, (rel) => rel.company, {
    cascade: true,
  })
  companyTypeRels: CompanyTypeRel[];
}
