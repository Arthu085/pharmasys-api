export class PaginationMetaDto {
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}

export class PaginatedResponseDto<T> {
  data: T[];
  meta: PaginationMetaDto;
  message?: string;
}
