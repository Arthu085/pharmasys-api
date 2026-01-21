import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RESPONSE_MESSAGE_KEY } from '../decorators/response-message.decorator';
import {
  Response,
  PaginatedData,
} from '../../shared/interfaces/response.interface';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const responseMessage =
      this.reflector.get<string>(RESPONSE_MESSAGE_KEY, context.getHandler()) ||
      'Operação realizada com sucesso';

    return next.handle().pipe(
      map((data: T & PaginatedData) => {
        const message = this.getResponseMessage(data, responseMessage);

        const normalizedData = (data === undefined ? null : data) as
          | (T & PaginatedData)
          | null;

        return {
          success: true,
          message,
          data: normalizedData,
        };
      }),
    );
  }

  private getResponseMessage(
    data: PaginatedData | null | undefined,
    defaultMessage: string,
  ): string {
    if (data?.meta?.total === 0) {
      return 'Nenhum dado encontrado com os filtros aplicados';
    }
    return defaultMessage;
  }
}
