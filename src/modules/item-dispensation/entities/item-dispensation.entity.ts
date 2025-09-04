import { BaseEntity } from 'src/common/entites/base.entity';
import { Patient } from 'src/modules/patient/entities/patient.entity';
import { Prescriptor } from 'src/modules/prescriptor/entities/prescriptor.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity('item_dispensation', {
  comment: 'Tabela para cadastro dispensação de itens',
})
export class ItemDispensation extends BaseEntity {
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
