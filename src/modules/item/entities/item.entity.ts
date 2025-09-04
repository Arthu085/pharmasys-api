import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Type } from './type.entity';
import { Presentation } from './presentation.entity';
import { Dosage } from './dosage.entity';
import { Subtype } from './subtype.entity';
import { BaseEntity } from 'src/common/entites/base.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('item', { comment: 'Tabela para o cadastro de item' })
@Index(['name', 'type', 'presentation', 'dosage', 'subtype'])
export class Item extends BaseEntity {
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: User;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: User | null;

  @Column({ length: 255, comment: 'Nome do item' })
  @Index()
  name: string;

  @ManyToOne(() => Type, { eager: true })
  @JoinColumn({ name: 'type_id' })
  @Index()
  type: Type;

  @ManyToOne(() => Presentation, { eager: true })
  @JoinColumn({ name: 'presentation_id' })
  @Index()
  presentation: Presentation;

  @ManyToOne(() => Dosage, { eager: true })
  @JoinColumn({ name: 'dosage_id' })
  @Index()
  dosage: Dosage;

  @ManyToOne(() => Subtype, { eager: true })
  @JoinColumn({ name: 'subtype_id' })
  @Index()
  subtype?: Subtype | null;
}
