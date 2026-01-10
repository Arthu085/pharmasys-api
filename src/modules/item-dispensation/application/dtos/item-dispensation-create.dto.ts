import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class ItemDispensationCreateDto {
  @IsUUID('4', { message: 'O paciente deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O paciente é obrigatório' })
  patient: UUID;

  @IsUUID('4', { message: 'O prescritor deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O prescritor é obrigatório' })
  prescriptor: UUID;

  @IsUUID('4', { message: 'O local de estoque deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O local de estoque é obrigatório' })
  stockLocation: UUID;

  @IsDate({ message: 'A data de dispensação deve ser uma data' })
  @Type(() => Date)
  @IsNotEmpty({ message: 'A data de dispensação é obrigatória' })
  dispensationDate: Date;
}
