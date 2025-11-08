import { BaseEntity } from 'src/core/database/entities/base.entity';
import { PatientEntity } from 'src/modules/patient/entities/patient.entity';
import { PrescriptorEntity } from 'src/modules/prescriptor/entities/prescriptor.entity';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity('item_dispensation', {
  comment: 'Tabela para cadastro dispensação de itens',
})
export class ItemDispensationEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: UserEntity;

  @ManyToOne(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: UserEntity | null;

  @ManyToOne(() => PatientEntity, { eager: true })
  @JoinColumn({ name: 'patient_id' })
  @Index()
  patient: PatientEntity;

  @ManyToOne(() => PrescriptorEntity, { eager: true })
  @JoinColumn({ name: 'prescriptor_id' })
  @Index()
  prescriptor: PrescriptorEntity;

  @Column({
    type: 'timestamptz',
    name: 'dispensation_date',
    comment: 'Data da dispensação selecionada pelo usuário',
  })
  @Index()
  dispensationDate: Date;
}
