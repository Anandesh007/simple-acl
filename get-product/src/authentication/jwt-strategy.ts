import {AuthenticationStrategy} from '@loopback/authentication';
import {UserProfile, securityId} from '@loopback/security';
import {Request} from '@loopback/rest';
import jwt from 'jsonwebtoken';

export class JWTStrategy implements AuthenticationStrategy {
  name = 'jwt';

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = this.extractToken(request);
    if (!token) return undefined;

    const payload = jwt.verify(token, 'mysecretkey') as any;
    
    const userProfile: UserProfile = {
      [securityId]: payload.id.toString(),
      id: payload.id,
      role: payload.role,
    };

    return userProfile;
  }

  extractToken(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return undefined;
    return parts[1];
  }
}
