import { BaseEntity } from 'src/core/database/entities/base.entity';
import { CompanyEntity } from 'src/modules/company/domain/entities/company.entity';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BatchCode } from '../values-objects/batch-code.vo';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { BatchInactiveException } from '../exceptions/batch-inactive.exception';

@Entity('batch', { comment: 'Tabela para cadastro de lotes' })
@Index(['company', 'batchCode'])
@Index('IDX_code_unique_when_not_deleted', ['batchCode'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
export class BatchEntity extends BaseEntity {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_created_id' })
  userCreated: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: UserEntity | null;

  @ManyToOne(() => CompanyEntity)
  @JoinColumn({ name: 'company_id' })
  @Index()
  company: CompanyEntity;

  @Column({
    length: 20,
    comment: 'Código do lote',
    name: 'batch_code',
  })
  @Index()
  batchCode: string;

  @Column({
    type: 'date',
    comment: 'Data de expiração',
    name: 'expiration_date',
  })
  expirationDate: Date;

  changeBatchCode(newBatchCode: BatchCode): void {
    const currentBatchCode = BatchCode.create(this.batchCode);

    if (newBatchCode.equals(currentBatchCode)) {
      return;
    }

    this.batchCode = newBatchCode.getValue();
    this.updatedAt = new Date();
  }

  changeCompany(newCompany: CompanyEntity): void {
    const currentCompany = this.company;

    if (newCompany.id === currentCompany.id) {
      return;
    }

    this.company = newCompany;
    this.updatedAt = new Date();
  }

  changeExpirationDate(newExpirationDate: Date): void {
    const currentExpirationDate = this.expirationDate;

    if (newExpirationDate === currentExpirationDate) {
      return;
    }

    this.expirationDate = newExpirationDate;
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
      throw new BatchInactiveException();
    }
  }
}
