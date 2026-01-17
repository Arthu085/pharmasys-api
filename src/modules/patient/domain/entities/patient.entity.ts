import { BaseEntity } from 'src/core/database/entities/base.entity';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { PatientInactiveException } from '../exceptions/patient-inactive.exception';
import { PatientName } from '../values-objects/patient-name.vo';
import { PatientDocument } from '../values-objects/patient-document.vo';

@Entity('patient', { comment: 'Tabela para cadastro de pacientes' })
@Index(['name', 'document'])
@Index('IDX_patient_document_unique_when_not_deleted', ['document'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
export class PatientEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: UserEntity;

  @ManyToOne(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: UserEntity | null;

  @Column({ length: 150, comment: 'Nome do paciente' })
  @Index()
  name: string;

  @Column({ length: 14, comment: 'Documento do paciente' })
  document: string;

  changeName(newName: PatientName): void {
    const currentName = PatientName.create(this.name);

    if (newName.equals(currentName)) {
      return;
    }

    this.name = newName.getValue();
    this.updatedAt = new Date();
  }

  changeDocument(newDocument: PatientDocument): void {
    const currentDocument = PatientDocument.create(this.document);

    if (newDocument.equals(currentDocument)) {
      return;
    }

    this.document = newDocument.getValue();
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
      throw new PatientInactiveException();
    }
  }
}
