import { BaseEntity } from 'src/core/database/entities/base.entity';
import { Patient } from 'src/modules/patient/entities/patient.entity';
import { Prescriptor } from 'src/modules/prescriptor/entities/prescriptor.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity('item_dispensation', {
  comment: 'Tabela para cadastro dispensação de itens',
})
export class ItemDispensation extends BaseEntity {
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: User;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: User | null;

  @ManyToOne(() => Patient, { eager: true })
  @JoinColumn({ name: 'patient_id' })
  @Index()
  patient: Patient;

  @ManyToOne(() => Prescriptor, { eager: true })
  @JoinColumn({ name: 'prescriptor_id' })
  @Index()
  prescriptor: Prescriptor;

  @Column({
    type: 'timestamptz',
    name: 'dispensation_date',
    comment: 'Data da dispensação selecionada pelo usuário',
  })
  @Index()
  dispensationDate: Date;
}
