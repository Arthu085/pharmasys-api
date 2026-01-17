import { InvalidInventoryEntryInvoiceNumberException } from '../exceptions/invalid-inventory-entry-invoice-number.exception';

export class InventoryEntryInvoiceNumber {
  private constructor(private readonly value: string) {}

  static create(invoiceNumber: string): InventoryEntryInvoiceNumber {
    const trimmedNumber = invoiceNumber.trim();

    if (!trimmedNumber) {
      throw new InvalidInventoryEntryInvoiceNumberException(
        'Número da nota fiscal é obrigatório',
      );
    }

    if (trimmedNumber.length < 3) {
      throw new InvalidInventoryEntryInvoiceNumberException(
        'Número da nota fiscal deve ter no mínimo 3 caracteres',
      );
    }

    if (trimmedNumber.length > 70) {
      throw new InvalidInventoryEntryInvoiceNumberException(
        'Número da nota fiscal deve ter no máximo 70 caracteres',
      );
    }

    return new InventoryEntryInvoiceNumber(trimmedNumber);
  }

  getValue(): string {
    return this.value;
  }
}
