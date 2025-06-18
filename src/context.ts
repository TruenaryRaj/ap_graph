import { Request } from 'express';
import { validateToken, JwtPayload } from './auth/auth.services';

export interface GraphQLContext {
  user?: JwtPayload;
}
export function buildContext({ req }: { req: Request }): GraphQLContext {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (!token) return {};
  const user = validateToken(token);
  if (!user) return {};

  return { user };
}
