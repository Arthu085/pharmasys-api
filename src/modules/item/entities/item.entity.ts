import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { TypeEntity } from './type.entity';
import { PresentationEntity } from './presentation.entity';
import { DosageEntity } from './dosage.entity';
import { SubtypeEntity } from './subtype.entity';
import { BaseEntity } from 'src/core/database';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Entity('item', { comment: 'Tabela para o cadastro de item' })
@Index(['name', 'type', 'presentation', 'dosage', 'subtype'])
export class ItemEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: UserEntity;

  @ManyToOne(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: UserEntity | null;

  @Column({ length: 255, comment: 'Nome do item' })
  @Index()
  name: string;

  @ManyToOne(() => TypeEntity, { eager: true })
  @JoinColumn({ name: 'type_id' })
  @Index()
  type: TypeEntity;

  @ManyToOne(() => PresentationEntity, { eager: true })
  @JoinColumn({ name: 'presentation_id' })
  @Index()
  presentation: PresentationEntity;

  @ManyToOne(() => DosageEntity, { eager: true })
  @JoinColumn({ name: 'dosage_id' })
  @Index()
  dosage: DosageEntity;

  @ManyToOne(() => SubtypeEntity, { eager: true })
  @JoinColumn({ name: 'subtype_id' })
  @Index()
  subtype?: SubtypeEntity | null;
}
