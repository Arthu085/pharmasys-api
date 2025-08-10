import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ItemRepository } from 'src/modules/items/repositories/item.repository';

@Injectable()
export class IsOwnerGuardItem implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly itemRepositor: ItemRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;
    const itemId = +request.params.id;

    if (!userId || isNaN(itemId)) {
      throw new ForbiddenException('Acesso negado');
    }

    const item = await this.itemRepositor.findById(itemId);

    if (!item) {
      throw new NotFoundException('Item não encontrado');
    }

    if (item.user_id !== userId) {
      throw new ForbiddenException('Você não tem permissão para essa ação');
    }

    return true;
  }
}
