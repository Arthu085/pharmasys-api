import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserPayload } from 'src/shared/interfaces/user-payload.interface';

import { ProfileResponseDto } from '../dtos/profile-response.dto';

@Injectable()
export class FindOneProfileUseCase {
  execute(user: UserPayload): ProfileResponseDto {
    return plainToInstance(ProfileResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
