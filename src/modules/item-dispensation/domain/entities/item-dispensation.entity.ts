import { BaseEntity } from 'src/core/database/entities/base.entity';
import { PatientEntity } from 'src/modules/patient/domain/entities/patient.entity';
import { PrescriptorEntity } from 'src/modules/prescriptor/domain/entities/prescriptor.entity';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ItemDispensationItemEntity } from './item-dispensation-item.entity';
import { StockLocationEntity } from 'src/modules/stock-location/domain/entities/stock-location.entity';

@Entity('item_dispensation', {
  comment: 'Tabela para cadastro dispensação de itens',
})
@Index(['patient', 'dispensationDate', 'prescriptor', 'stockLocation'])
export class ItemDispensationEntity extends BaseEntity {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_created_id' })
  userCreated: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: UserEntity | null;

  @ManyToOne(() => PatientEntity)
  @JoinColumn({ name: 'patient_id' })
  @Index()
  patient: PatientEntity;

  @ManyToOne(() => PrescriptorEntity)
  @JoinColumn({ name: 'prescriptor_id' })
  @Index()
  prescriptor: PrescriptorEntity;

  @ManyToOne(() => StockLocationEntity)
  @JoinColumn({ name: 'stock_location_id' })
  @Index()
  stockLocation: StockLocationEntity;

  @Column({
    type: 'timestamptz',
    name: 'dispensation_date',
    comment: 'Data da dispensação selecionada pelo usuário',
  })
  @Index()
  dispensationDate: Date;

  @OneToMany(() => ItemDispensationItemEntity, (item) => item.itemDispensation)
  items: ItemDispensationItemEntity[];
}
