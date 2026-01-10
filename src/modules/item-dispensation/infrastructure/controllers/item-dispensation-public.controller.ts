import { Controller } from '@nestjs/common';
import { Public } from 'src/modules/auth/infrastructure/decorators/public.decorator';

@Controller('item/dispensation')
@Public()
export class ItemDispensationPublicController {}
