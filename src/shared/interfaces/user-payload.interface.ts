import { UUID } from 'crypto';

export interface UserPayload {
  id?: number;
  uuid: UUID;
  name: string;
  email: string;
  role?: string;
}
