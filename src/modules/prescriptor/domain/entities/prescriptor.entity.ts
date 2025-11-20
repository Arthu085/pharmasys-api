import { BaseEntity } from 'src/core/database/entities/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { AdviceEntity } from './advice.entity';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { PrescriptorName } from '../value-objects/prescriptor-name.vo';
import { RegistrationNumber } from '../value-objects/registration-number.vo';
import { State } from '../value-objects/state.vo';
import { PrescriptorInactiveException } from '../exceptions/prescriptor-inactive.exception';
import { StatusEnum } from 'src/shared/enums/status.enum';

@Entity('prescriptor', { comment: 'Tabela para cadastro de prescritores' })
@Index(['name', 'registrationNumber', 'advice'])
@Index(
  'IDX_prescriptor_registration_advice_unique_when_not_deleted',
  ['registrationNumber', 'advice'],
  {
    unique: true,
    where: '"deleted_at" IS NULL',
  },
)
export class PrescriptorEntity extends BaseEntity {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_created_id' })
  userCreated: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: UserEntity | null;

  @Column({ length: 150, comment: 'Nome do prescritor' })
  @Index()
  name: string;

  @Column({
    length: 30,
    comment: 'Número de registro do prescritor no conselho profissional',
    name: 'registration_number',
  })
  @Index()
  registrationNumber: string;

  @ManyToOne(() => AdviceEntity)
  @JoinColumn({ name: 'advice_id' })
  @Index()
  advice: AdviceEntity;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
    comment: 'Especialidade do prescritor',
  })
  specialty?: string | null;

  @Column({
    length: 2,
    type: 'char',
    comment: 'UF do conselho profissional',
  })
  state: string;

  changeName(newName: PrescriptorName): void {
    const currentName = PrescriptorName.create(this.name);

    if (newName.equals(currentName)) {
      return;
    }

    this.name = newName.getValue();
    this.updatedAt = new Date();
  }

  changeRegistrationNumber(newRegistrationNumber: RegistrationNumber): void {
    const currentRegistrationNumber = RegistrationNumber.create(
      this.registrationNumber,
    );

    if (newRegistrationNumber.equals(currentRegistrationNumber)) {
      return;
    }

    this.registrationNumber = newRegistrationNumber.getValue();
    this.updatedAt = new Date();
  }

  changeState(newState: State): void {
    const currentState = State.create(this.state);

    if (newState.equals(currentState)) {
      return;
    }

    this.state = newState.getValue();
    this.updatedAt = new Date();
  }

  changeAdvice(newAdvice: AdviceEntity): void {
    this.advice = newAdvice;
    this.updatedAt = new Date();
  }

  changeSpecialty(newSpecialty: string | null): void {
    this.specialty = newSpecialty;
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
      throw new PrescriptorInactiveException();
    }
  }

  hasAdvice(adviceAcronym: string): boolean {
    return this.advice.acronym === adviceAcronym;
  }
}
