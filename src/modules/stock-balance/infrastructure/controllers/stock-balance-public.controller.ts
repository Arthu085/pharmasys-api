import { Controller } from '@nestjs/common';
import { Public } from 'src/modules/auth/infrastructure/decorators/public.decorator';

@Controller('stock/balance')
@Public()
export class StockBalancePublicController {}
