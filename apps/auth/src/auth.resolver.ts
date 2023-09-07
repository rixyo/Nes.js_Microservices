import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TokenType, UserType } from './user/user.type';
import { AuthService } from './auth.service';
import { CreateSignupInput, LoginInput } from './user/user.input';
import { AuthGuard, JWTUserType, User } from '@app/common';
import { Roles, Role } from '@app/common/decorators/role.decorator';
import { UseGuards } from '@nestjs/common';

@Resolver((of) => UserType)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Query((returns) => UserType)
  @UseGuards(AuthGuard)
  @Roles(Role.USER)
  async user(@User() user: JWTUserType) {
    return await this.authService.user(user.userId);
  }
  @Query((returns) => [UserType])
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  async allUsers() {
    return await this.authService.getAllUsers();
  }
  @Mutation((returns) => TokenType)
  async signup(
    @Args('createSignupInput') createSignupInput: CreateSignupInput,
  ) {
    return await this.authService.signup(createSignupInput);
  }
  @Mutation((returns) => TokenType)
  async login(@Args('loginInput') loginInput: LoginInput) {
    return await this.authService.login(loginInput);
  }
}
