import { InvalidItemDispensationDateException } from '../exceptions/invalid-item-dispensation-date.exception';

export class ItemDispensationDate {
  private constructor(private readonly value: Date) {}

  static create(dispensationDate: Date): ItemDispensationDate {
    if (!dispensationDate) {
      throw new InvalidItemDispensationDateException(
        'Data de dispensação é obrigatória',
      );
    }

    return new ItemDispensationDate(dispensationDate);
  }

  getValue(): Date {
    return this.value;
  }
}
