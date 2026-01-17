import { BadRequestException } from '@nestjs/common';

export class InvalidPatientDocumentException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Documento do paciente inválido');
  }
}
