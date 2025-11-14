import { BaseEntity } from 'src/core/database/entities/base.entity';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { StockLocationName } from '../value-objects/stock-location-name.vo';
import { StockLocationCode } from '../value-objects/stock-location-code.vo';
import { StockLocationInactiveException } from '../exceptions/stock-location-inactive.exception';
import { StatusEnum } from 'src/shared/enums/status.enum';

@Entity('stock_location', {
  comment: 'Tabela para cadastro de locais de estoque',
})
@Index(['name', 'code'])
@Index('IDX_stoc_location_code_unique_when_not_deleted', ['code'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
export class StockLocationEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated?: UserEntity | null;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: UserEntity | null;

  @Column({ length: 100, comment: 'Nome do local de estoque' })
  @Index()
  name: string;

  @Column({ length: 50, comment: 'Código do local de estoque' })
  code: string;

  @Column({
    name: 'is_central_stock',
    type: 'boolean',
    default: false,
    comment: 'Verifica se é estoque central',
  })
  isCentralStock: boolean;

  changeName(newName: StockLocationName): void {
    this.name = newName.getValue();
    this.updatedAt = new Date();
  }

  changeCode(newCode: StockLocationCode): void {
    this.code = newCode.getValue();
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
      throw new StockLocationInactiveException();
    }
  }
}
