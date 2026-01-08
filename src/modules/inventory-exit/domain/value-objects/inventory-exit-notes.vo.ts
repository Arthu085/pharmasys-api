import { InvalidInventoryExitNotesException } from '../exceptions/invalid-inventory-exit-notes.exception';

export class InventoryExitNotes {
  private constructor(private readonly value: string) {}

  static create(notes: string): InventoryExitNotes {
    const trimmedNotes = notes.trim();

    if (!trimmedNotes || trimmedNotes.length < 3) {
      throw new InvalidInventoryExitNotesException(
        'Notas de saída devem ter no mínimo 3 caracteres',
      );
    }

    if (trimmedNotes.length > 150) {
      throw new InvalidInventoryExitNotesException(
        'Notas de saída devem ter no máximo 500 caracteres',
      );
    }

    return new InventoryExitNotes(trimmedNotes);
  }

  getValue(): string {
    return this.value;
  }
}
