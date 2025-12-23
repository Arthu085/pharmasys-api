import { Expose } from 'class-transformer';

export class CompanyTypeResponseDto {
  @Expose()
  value: string;

  @Expose()
  label: string;
}
