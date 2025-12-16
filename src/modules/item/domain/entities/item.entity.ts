import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { TypeEntity } from './type.entity';
import { PresentationEntity } from './presentation.entity';
import { DosageEntity } from './dosage.entity';
import { SubtypeEntity } from './subtype.entity';
import { BaseEntity } from 'src/core/database/entities/base.entity';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { ItemInactiveException } from '../exceptions/item-inactive.exception';
import { ItemName } from '../value-objects/item-name.vo';

@Entity('item', { comment: 'Tabela para o cadastro de item' })
@Index(['name', 'type', 'presentation', 'dosage', 'subtype'])
export class ItemEntity extends BaseEntity {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_created_id' })
  userCreated: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: UserEntity | null;

  @Column({ length: 255, comment: 'Nome do item' })
  @Index()
  name: string;

  @ManyToOne(() => TypeEntity)
  @JoinColumn({ name: 'type_id' })
  @Index()
  type: TypeEntity;

  @ManyToOne(() => PresentationEntity)
  @JoinColumn({ name: 'presentation_id' })
  @Index()
  presentation: PresentationEntity;

  @ManyToOne(() => DosageEntity)
  @JoinColumn({ name: 'dosage_id' })
  @Index()
  dosage: DosageEntity;

  @ManyToOne(() => SubtypeEntity, { nullable: true })
  @JoinColumn({ name: 'subtype_id' })
  @Index()
  subtype?: SubtypeEntity | null;

  isActive(): boolean {
    return this.status === StatusEnum.ATIVO;
  }

  ensureIsActive(): void {
    if (!this.isActive()) {
      throw new ItemInactiveException();
    }
  }

  activate(): void {
    this.status = StatusEnum.ATIVO;
    this.updatedAt = new Date();
  }

  deactivate(): void {
    this.status = StatusEnum.INATIVO;
    this.updatedAt = new Date();
  }

  changeName(newName: ItemName): void {
    const currentName = ItemName.create(this.name);

    if (newName.equals(currentName)) {
      return;
    }

    this.name = newName.getValue();
    this.updatedAt = new Date();
  }

  changeType(newType: TypeEntity): void {
    this.type = newType;
    this.updatedAt = new Date();
  }

  changePresentation(newPresentation: PresentationEntity): void {
    this.presentation = newPresentation;
    this.updatedAt = new Date();
  }

  changeDosage(newDosage: DosageEntity): void {
    this.dosage = newDosage;
    this.updatedAt = new Date();
  }

  changeSubtype(newSubtype: SubtypeEntity | null): void {
    this.subtype = newSubtype;
    this.updatedAt = new Date();
  }
}
