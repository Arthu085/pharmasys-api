import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CompanyRepository } from 'src/modules/companies/repositories/company.repository';

@Injectable()
export class IsOwnerGuardCompany implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;
    const companyId = +request.params.id;

    if (!userId || isNaN(companyId)) {
      throw new ForbiddenException('Acesso negado');
    }

    const company = await this.companyRepository.findById(companyId);

    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    if (company.user_id !== userId) {
      throw new ForbiddenException('Você não tem permissão para essa ação');
    }

    return true;
  }
}
