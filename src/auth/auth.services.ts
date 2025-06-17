import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export interface JwtPayload {
  userId: number;
  email?: string;
}

export function generateToken(payload: JwtPayload) : string {
  return jwt.sign(
   payload, 
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

export function validateToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (err) {
    return null;
  }
}
