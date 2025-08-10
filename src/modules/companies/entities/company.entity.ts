import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyTypeRel } from './company_type_rel.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 180 })
  cnpj: string;

  @OneToMany(() => CompanyTypeRel, (rel) => rel.company, {
    cascade: true,
  })
  companyTypeRels: CompanyTypeRel[];

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  user_id: number;
}
