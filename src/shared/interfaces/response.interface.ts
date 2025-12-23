export interface Response<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedData {
  meta?: {
    total: number;
    page?: number;
    limit?: number;
  };
}
