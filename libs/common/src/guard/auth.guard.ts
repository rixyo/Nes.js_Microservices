import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
type JWTPayload = {
  userId: string;
  role: Role;
  iat: number;
  exp: number;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();
    const roles = this.reflector.get<Role[]>(
      'user_role',
      gqlContext.getHandler(),
    );
    try {
      if (!roles) {
        return true; // If no roles are required, access is granted.
      }
      const token = this.getTokenFromRequest(req);
      if (!token) {
        return false; // No token found, deny access.
      }

      const user = jwt.verify(token, 'mysupersecret') as JWTPayload;
      req.user = user;
      const result = roles.includes(user.role);
      if (result === true) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  private getTokenFromRequest(req: any): string | null {
    return req.headers.authorization?.split('Bearer ')[1] || null;
  }
}
