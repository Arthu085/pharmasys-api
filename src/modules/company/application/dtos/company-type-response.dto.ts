import { Expose } from 'class-transformer';

export class CompanyTypeResponseDto {
  @Expose()
  name: string;
}
