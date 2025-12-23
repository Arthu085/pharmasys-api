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
import { BaseEntity } from 'src/core/database/entities/base.entity';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { CompanyInactiveException } from '../exceptions/company-inactive.exception';
import { CompanyName } from '../values-objects/company-name.vo';
import { CompanyCnpj } from '../values-objects/company-cnpj.vo';

@Entity('company', { comment: 'Tabela para cadastro de empresa' })
@Index(['name', 'cnpj'])
@Index('IDX_cnpj_unique_when_not_deleted', ['cnpj'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
export class CompanyEntity extends BaseEntity {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_created_id' })
  userCreated: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: UserEntity | null;

  @Column({ length: 255, comment: 'Nome da empresa' })
  @Index()
  name: string;

  @Column({ length: 18, comment: 'CNPJ da empresa' })
  cnpj: string;

  @ManyToMany(() => CompanyTypeEntity, (type) => type.companies)
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

  changeName(newName: CompanyName): void {
    const currentName = CompanyName.create(this.name);

    if (newName.equals(currentName)) {
      return;
    }

    this.name = newName.getValue();
    this.updatedAt = new Date();
  }

  changeCnpj(newCnpj: CompanyCnpj): void {
    const currentCnpj = CompanyCnpj.create(this.cnpj);

    if (newCnpj.equals(currentCnpj)) {
      return;
    }

    this.cnpj = newCnpj.getValue();
    this.updatedAt = new Date();
  }

  changeCompanyTypes(newCompanyTypes: CompanyTypeEntity[]): void {
    this.companyTypes = newCompanyTypes;
    this.updatedAt = new Date();
  }

  activate(): void {
    this.status = StatusEnum.ATIVO;
    this.updatedAt = new Date();
  }

  deactivate(): void {
    this.status = StatusEnum.INATIVO;
    this.updatedAt = new Date();
  }

  isActive(): boolean {
    return this.status === StatusEnum.ATIVO;
  }

  ensureIsActive(): void {
    if (!this.isActive()) {
      throw new CompanyInactiveException();
    }
  }
}
