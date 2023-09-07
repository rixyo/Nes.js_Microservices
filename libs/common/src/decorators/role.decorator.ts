import { SetMetadata } from '@nestjs/common';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export const Roles = (...roles: Role[]) => SetMetadata('user_role', roles);
