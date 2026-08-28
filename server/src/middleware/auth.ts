import { Request, Response, NextFunction } from 'express';
import { User } from '@supabase/supabase-js';

// Custom Request interface with authenticated Supabase user
export interface AuthenticatedRequest extends Request {
  user?: User;
}

export async function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing or malformed token' });
    return;
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Unauthorized: Token missing' });
    return;
  }

  try {
    // Decode the Base64 payload from the JWT (Header.Payload.Signature)
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) {
      res.status(401).json({ error: 'Unauthorized: Malformed JWT' });
      return;
    }
    const rawString = Buffer.from(payloadBase64, 'base64url').toString('utf-8');
    // Fix Supabase's malformed aal claim if present
    const cleanString = rawString.replace(/,"aal\d+",/g, ',"aal":"aal1",');
    const payload = JSON.parse(cleanString);

    // Check expiration
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      res.status(401).json({ error: 'Unauthorized: Token expired' });
      return;
    }

    // Attach user to request
    req.user = {
      id: payload.sub,
      email: payload.email,
      app_metadata: payload.app_metadata ?? {},
      user_metadata: payload.user_metadata ?? {},
      aud: payload.aud ?? 'authenticated',
      created_at: '',
    };

    next();
  } catch (err) {
    console.error('JWT parse error:', err);
    res.status(401).json({ error: 'Unauthorized: Invalid token format' });
  }
}
