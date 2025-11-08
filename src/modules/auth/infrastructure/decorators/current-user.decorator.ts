import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from '../../../../shared/interfaces/user-payload.interface';

export const CurrentUser = createParamDecorator(
  (data: keyof UserPayload | 'id' | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as UserPayload;

    if (data === 'id') {
      return user?.sub;
    }

    if (data === 'sub') {
      return user?.sub;
    }

    return data ? user?.[data as keyof UserPayload] : user;
  },
);
