import { Controller } from '@nestjs/common';
import { Public } from 'src/modules/auth/infrastructure/decorators/public.decorator';

@Controller('inventory/exit')
@Public()
export class InventoryExitPublicController {}
