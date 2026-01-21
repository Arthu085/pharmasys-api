export interface Response<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface PaginatedData {
  meta?: {
    total: number;
    page?: number;
    limit?: number;
  };
}
