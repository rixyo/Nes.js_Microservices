import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserType } from './user/user.type';
import { AuthService } from './auth.service';

@Resolver((of) => UserType)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query((returns) => UserType)
  async users() {
    return {
      id: '1',
      name: 'User 1',
      email: 'oorixy@gmail.com',
      role: 'admin',
    };
  }
}
