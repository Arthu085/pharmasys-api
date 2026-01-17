import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransferReasonEntity } from '../../domain/entities/transfer-reason.entity';
import { TransferReasonEnum } from '../../domain/enums/transfer-reason.enum';
import { ITransferReasonRepository } from '../../domain/repositories/transfer-reason.repository.interface';

@Injectable()
export class TransferReasonRepository implements ITransferReasonRepository {
  constructor(
    @InjectRepository(TransferReasonEntity)
    private readonly repo: Repository<TransferReasonEntity>,
  ) {}

  findByName(name: TransferReasonEnum): Promise<TransferReasonEntity | null> {
    return this.repo.findOne({ where: { name } });
  }
}
