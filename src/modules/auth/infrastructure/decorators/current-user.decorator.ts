import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from '../../../../shared/interfaces/user-payload.interface';

export const CurrentUser = createParamDecorator(
  (
    data: keyof UserPayload | 'uuid' | 'id' | undefined,
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as UserPayload;

    if (data === 'uuid') {
      return user?.uuid;
    }

    if (data === 'id') {
      return user?.id;
    }

    return data ? user?.[data as keyof UserPayload] : user;
  },
);
