import { ConflictException } from '@nestjs/common';

export class EntryTypeAndInvoiceNumberConflictException extends ConflictException {
  constructor(message: string) {
    super(message);
  }
}
