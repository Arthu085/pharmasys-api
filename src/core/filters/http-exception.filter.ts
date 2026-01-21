import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      const message =
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'message' in exceptionResponse
          ? (exceptionResponse as any).message
          : exception.message;

      response.status(status).json({
        success: false,
        message: Array.isArray(message) ? message[0] : message,
        data: null,
      });
      return;
    }

    response.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      data: null,
    });
  }
}
