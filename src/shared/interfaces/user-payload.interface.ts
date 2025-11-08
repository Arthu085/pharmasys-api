export interface UserPayload {
  sub: number;
  name: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}
