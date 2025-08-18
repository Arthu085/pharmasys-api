import { ResponseUserDto } from 'src/modules/users/DTOs/response.user.dto';

export class ResponseStockLocationDto {
  id: number;
  name: string;
  code: string;
  is_central_stock: boolean;
  user?: ResponseUserDto | null;
  user_id?: number | null;
}
