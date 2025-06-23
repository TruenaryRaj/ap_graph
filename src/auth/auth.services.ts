import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '1h';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh';
const JWT_REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE || '7d';

export interface JwtPayload {
  userId: number;
  email?: string; 
}


export function generateVerificationCode(email: string): string {
  const code = Math.floor(100000 + Math.random() * 900000).toString(); 
  return code;
}


export function generateToken(payload: JwtPayload) : string {
  return jwt.sign(
    payload,
    JWT_SECRET,
    { expiresIn: JWT_EXPIRE } as jwt.SignOptions
  );
}

export function generateRefreshToken(payload: JwtPayload) : String {
  return jwt.sign(
    payload,
    JWT_REFRESH_SECRET,
    { expiresIn: JWT_REFRESH_EXPIRE} as jwt.SignOptions
  )
}

export function validateToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (err) {
    return null;
  }
}

export function validateRefreshToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as JwtPayload;
  } catch (err) {
    return null;
  }
}

